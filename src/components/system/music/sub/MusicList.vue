<template>
  <div>
    <el-popover
      placement="top-start"
      width="500"
      title="音乐列表"
      trigger="click"
    >
      <div>
        <!-- 表格实现音乐列表 -->
        <el-table :data="list_data" :max-height="400" size="small" style="width: 100%" :show-header="false">
          <el-table-column label="歌名" width="180">
            <template slot-scope="scope">
              <span v-html="scope.row.music_name"></span>
            </template>
          </el-table-column>
          <el-table-column label="歌手" width="180">
            <template slot-scope="scope">
              <span v-html="scope.row.music_artist"></span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="play(scope.$index, scope.row)"
                icon="el-icon-video-play"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                @click="music_list_delete(scope.$index, scope.row)"
                icon="el-icon-delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <i slot="reference" class="el-icon-document-copy"
        ><small>{{ list_data.length }}</small></i
      >
    </el-popover>
  </div>
</template>
<script>
import Pass from "@/plugins/Pass.js";
export default {
  data() {
    return {
      list_data: [],
      array_num: 0,
      play_list_num: 0,
      playing_num: 0,
    };
  },
  created() {
    Pass.$on("list_data", (list_data) => {
      this.list_data.splice(this.list_data.length, 0, list_data);
      this.play_list_num = this.list_data.length;
    });
    Pass.$on("play_end", () => {
      if (this.playing_num == 0) {
        if (this.play_list_num == 0) {
          this.$message.warning("当前歌单没有歌曲，请您添加");
        } else {
          this.$message.warning(
            "检测到不是从歌单开始播放，或已经为最后一曲，将为您开始播放歌单歌曲"
          );
            Pass.$emit("play_list_data", this.list_data[0]);
        }
      }else if (this.playing_num > this.play_list_num - 2) {
        this.$message.warning("歌单播放完毕");
      } else {
        this.playing_num += 1;
        Pass.$emit("play_list_data", this.list_data[this.playing_num]);
      }
    });
    Pass.$on("switch_songs", (label) => {
      switch (label) {
        case "last":
          this.playing_num -= 1;
          if (this.playing_num == -1) {
            this.playing_num = 0;
            this.$message.warning("当前音乐为第一曲");
          } else {
            Pass.$emit("play_list_data", this.list_data[this.playing_num]);
          }
          break;
        case "next":
          this.playing_num += 1;
          if (this.playing_num == this.play_list_num) {
            this.$message.warning(
              "当前音乐是最后一曲，如您需要重新播放请再次点击"
            );
          } else if (this.playing_num - this.play_list_num > 0) {
            this.playing_num = 0;
            Pass.$emit("play_list_data", this.list_data[this.playing_num]);
          } else {
            Pass.$emit("play_list_data", this.list_data[this.playing_num]);
          }
          break;
      }
    });
  },
  methods: {
    play(index) {
      //点击播放时触发，将点击的data上传到父组件实现播放
      this.playing_num = index;
      Pass.$emit("play_list_data", this.list_data[this.playing_num]);
    },
    music_list_delete(index) {
      //移除列表
      this.list_data.splice(index, 1);
      this.play_list_num -= 1;
    },
  },
};
</script>