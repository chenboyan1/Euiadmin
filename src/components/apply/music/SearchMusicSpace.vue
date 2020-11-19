<template>
  <div>
    <el-card style="margin-bottom: 120px">
      <div slot="header" class="clearfix">
        <router-link to="/apply/music" id="link">
          <span>EuiAdmin音乐</span>
        </router-link>
        <el-button
          size="small"
          type="danger"
          @click="search_music()"
          icon="el-icon-search"
          style="float: right"
          >搜索</el-button
        >
        <el-input
          v-model="search_value"
          placeholder="请输入音乐相关信息"
          @change="search_music()"
          size="small"
          style="float: right; width: 200px"
        ></el-input>
      </div>
      <div style="min-height: 20vh">
        <el-table
          :data="music_data.list"
          style="width: 100%"
          v-loading="loading_data.loading_state"
          :element-loading-text="loading_data.loading_text"
        >
          <el-table-column type="index" width="50" prop="date" label="序号">
          </el-table-column>
          <el-table-column label="歌名" width="500">
            <template slot-scope="scope">
              <el-avatar shape="square" :src="scope.row.pic120"></el-avatar>
              <span v-html="scope.row.name"></span>
              <div style="float: right">
                <i
                  class="el-icon-film"
                  @click="play_mv(scope.$index, scope.row)"
                  v-show="scope.row.hasmv == 1"
                  style="font-size: 150%; color: #67c23a; cursor: pointer"
                />
                <i
                  class="el-icon-video-play"
                  @click="play_music(scope.$index, scope.row)"
                  style="
                    font-size: 150%;
                    color: #409eff;
                    cursor: pointer;
                    margin-left: 10px;
                  "
                />
                <i
                  class="el-icon-plus"
                  @click="add_music_list(scope.$index, scope.row)"
                  style="
                    font-size: 150%;
                    color: #f56c6c;
                    margin-left: 10px;
                    cursor: pointer;
                  "
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="歌手">
            <template slot-scope="scope">
              <span v-html="scope.row.artist"></span>
            </template>
          </el-table-column>
          <el-table-column label="专辑">
            <template slot-scope="scope">
              <span v-html="scope.row.album"></span>
            </template>
          </el-table-column>
          <el-table-column label="播放次数" width="100">
            <template slot-scope="scope">
              <span>{{ parseInt(scope.row.pay / 10000) }}万</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="songTimeMinutes"
            label="时长"
            width="100"
          ></el-table-column>
        </el-table>
        <el-pagination
          @size-change="page_size_change"
          @current-change="current_change"
          :current-page="page_data.current_page"
          :page-sizes="[5, 10, 20, 50, 100, 200, 500]"
          :page-size="page_data.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page_data.page_total"
          style="margin-top: 10px"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import Pass from "@/plugins/Pass.js";
export default {
  data() {
    return {
      loading_data: {
        loading_state: false,
        loading_text: "正在加载",
      },
      show_music_space: false,
      search_value: "",
      music_list: [],
      music_play_data: {
        music_name: "",
        music_artist: "",
        music_url: "",
        music_pic: undefined,
        music_lrc: [],
      },
      page_data: {
        page_size: 10,
        current_page: 1,
        page_total: 0,
      },
      music_data: [],
    };
  },
  methods: {
    play_music(index) {
      this.loading_data.loading_state = true;
      this.loading_data.loading_text =
        "即将为您播放《" + this.music_data.list[index].name + "》";
      // console.log(this.music_data.list[index])
      this.$axios({
        method: "post",
        url: "/song/music",
        data: this.$qs.stringify({
          music_id: this.music_data.list[index].musicrid,
          rid: this.music_data.list[index].rid,
        }),
      }).then((response) => {
        console.log(response);
        this.music_play_data = {
          music_name: this.music_data.list[index].name,
          music_artist: this.music_data.list[index].artist,
          music_url: response.data.play_data.url,
          music_pic: this.music_data.list[index].pic,
          music_lrc: response.data.lrc.data.lrclist,
        };
        Pass.$emit("music_play_data", this.music_play_data);
        this.loading_data.loading_state = false;
      });
    },
    play_mv(index) {
      this.loading_data.loading_state = true;
      this.$message.success(
        "正在获取《" + this.music_data.list[index].name + "》相关相关视频"
      );
      // console.log(this.music_data.list[index])
      this.$axios({
        method: "post",
        url: "/song/mv",
        data: this.$qs.stringify({
          rid: this.music_data.list[index].rid,
        }),
      }).then((response) => {
        // console.log(response)
        this.loading_data.loading_state = false;
        if (response.data == "res not found") {
          this.$message.warning(
            "暂未查询到《" + this.music_data.list[index].name + "》相关视频"
          );
        } else {
          this.$message.success("已查询到相关视频，3秒后为您在新窗口播放");
          setTimeout(() => {
            window.open(response.data);
          }, 2000);
        }
      });
    },
    add_music_list(index) {
      this.loading_data.loading_state = true;
      this.$axios({
        method: "post",
        url: "/song/music",
        data: this.$qs.stringify({
          music_id: this.music_data.list[index].musicrid,
          rid: this.music_data.list[index].rid,
        }),
      }).then((response) => {
        this.music_list = {
          music_name: this.music_data.list[index].name,
          music_artist: this.music_data.list[index].artist,
          music_url: response.data.play_data.url,
          music_pic: this.music_data.list[index].pic,
          music_lrc: response.data.lrc.data.lrclist,
        };
        Pass.$emit("list_data", this.music_list);
        this.loading_data.loading_state = false;
        this.$message.success(
          "为您添加《" +
            this.music_data.abslist[index].SONGNAME +
            "》到列表成功"
        );
      });
    },
    page_size_change(page_size) {
      this.page_data.page_size = page_size;
      this.$message.success("每页显示" + page_size + "条数据");
      this.search_music();
    },
    current_change(click_page) {
      this.page_data.current_page = click_page;
      this.$message.success("正在展示第" + click_page + "页数据");
      this.search_music();
    },
    search_music() {
      this.loading_data.loading_state = true;
      this.loading_data.loading_text =
        "正在搜索“" + this.search_value + "”相关信息";
      this.$axios({
        method: "post",
        url: "/song/search",
        data: this.$qs.stringify({
          key: this.search_value,
          row_num: this.page_data.page_size,
          page_num: this.page_data.current_page,
        }),
      }).then((response) => {
        // console.log(response.data.data);
        this.music_data = response.data.data;
        this.page_data.page_total = Number(this.music_data.total);
        this.loading_data.loading_state = false;
      });
    },
  },
  mounted() {
    this.search_value = this.$route.query.key;
    this.search_music();
  },
};
</script>
<style scoped>
#link {
  color: #606266;
  text-decoration: none;
}
</style>