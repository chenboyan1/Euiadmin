<template>
  <div>
    <el-card style="margin-bottom: 120px">
      <div slot="header" class="clearfix">
        <span>EuiAdmin音乐</span>
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
      <div style="min-height: 50vh" v-loading="loading_data.loading_state" :element-loading-text="loading_data.loading_text">
        <el-row
          :gutter="20"
          v-for="(bang, bang_index) in bang_menu_data"
          :key="bang_index"
          style="margin-bottom: 20px"
        >
          <el-tag effect="dark" type="danger">{{ bang.name }}</el-tag>
          <el-divider />
          <el-col
            span="6"
            v-for="(list, list_index) in bang_menu_data[bang_index].list"
            :key="list_index"
            align="left"
          >
            <div id="show" @click="get_bang_song(bang_index,list_index)">
              <el-image :src="list.pic" />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search_value: "",
      bang_menu_data: [],
      loading_data: {
        loading_state: false,
        loading_text: "正在加载",
      },
    };
  },
  methods: {
    search_music() {
      this.$router.push({
        path: "/apply/music/search",
        query: {
          key: this.search_value,
        },
      });
    },
    get_bang_song(bang_index,list_index){
      this.$router.push({
        path: "/apply/music/bang",
        query: {
          bang_id: this.bang_menu_data[bang_index].list[list_index].sourceid,
          bang_name:this.bang_menu_data[bang_index].list[list_index].name,
        },
      });
    },
    get_bang_menu() {
      this.loading_data.loading_state=true
      this.$axios({
        method: "post",
        url: "/song/bang",
      }).then((response) => {
        this.bang_menu_data = response.data.data;
        // console.log(response);
        this.loading_data.loading_state=false
      });
    },
  },
  mounted() {
    this.get_bang_menu();
  },
};
</script>
<style scoped>
#show {
  cursor: pointer;
  margin-bottom: 10px;
  color:#606266;
  word-wrap: break-word;
  word-break: normal;
}
</style>