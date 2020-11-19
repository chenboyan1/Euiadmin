<template>
  <div>
    <el-card shadow="never" class="card">
      <div slot="header" class="clearfix">
        <span>获取EuiAdmin源码</span>
      </div>
      <div id="back">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(eui, index) in eui_data" :key="index">
            <el-card shadow="never" class="card" style="min-height:320px">
              <div slot="header" class="clearfix">
                <span>{{ eui.title }}</span>
              </div>
              <div>
                <div v-html="eui.explain"></div>
                <div style="margin-top: 30px; text-align: center">
                  <el-button
                    :type="eui.button_type"
                    @click="download(index)"
                    icon="el-icon-download"
                    >{{ eui.button_title }}</el-button
                  >
                </div>
              </div>
            </el-card>
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
      file_link: "",
      web_link: "http://api.euiadmin.com",
      eui_data: [
        {
          title: "EuiAdmin源码下载",
          explain:
            '<div> <div><span style="color: #169179;">EuiAdmin</span>基于<span style="color: #e03e2d;">Vue+Element</span>的免费开源后台模板。</div> <div>通过使用EuiAdmin你可以很简单的搭建一个成型的后台，也可以为你提供简单的学习环境。</div> <div>免费开源</div> </div> ',
          download_key: "euiadmin",
          button_title: "获取EuiAdmin源码",
          button_type: "success",
        },
        {
          title: "EuiAdmin用户开发者手册测试版",
          explain:
            '<p>EuiAdmin用户开发手册（<span style="color: #2dc26b;">试行版</span>），主要为了方便开发者快速了解EuiAdmin更快开发</p>',
          download_key: "manual",
          button_title: "获取基础手册",
          button_type: "danger",
        },
        {
          title: "EuiMusic",
          explain:
            '<p><span style="color: #2dc26b;"><span style="color: #e03e2d;">E</span><span style="color: #b96ad9;">ui</span><span style="color: #e67e23;">M</span>usic</span>&mdash;&mdash;模块化的音乐播放组件</p><p>你可以快速将EuiMusic集成到自己的项目或者在EuiAdmin中使用，具体请查看<span style="color: #ba372a;">最新参考手册</span></p>',
          download_key: "music",
          button_title: "EuiMusic",
          button_type: "primary",
        },
      ],
    };
  },
  methods: {
    download(index) {
      this.$axios({
        method: "post",
        url: "/file/download",
        data: this.$qs.stringify({
          file_key: this.eui_data[index].download_key,
        }),
      }).then((response) => {
        this.$message.success("获取文件成功，即将执行下载");
        this.file_link = this.web_link + response.data;
        setTimeout(() => {
          window.open(this.file_link);
        }, 1500);
      });
    },
  },
};
</script>
<style scoped>
#back {
  min-height: 50vh;
  color: #606266;
}
</style>