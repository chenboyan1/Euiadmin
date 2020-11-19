<template>
  <div>
    <el-card shadow="never">
      <div slot="header">网站设置</div>
      <div style="min-height:60vh">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="网站名称">
            <el-input v-model="form.web_name"></el-input>
          </el-form-item>
          <el-form-item label="网站网址">
            <el-input v-model="form.web_link"></el-input>
          </el-form-item>
          <el-form-item label="文件前缀链接">
            <el-input v-model="form.file_web_link"></el-input>
          </el-form-item>
          <el-form-item label="文件上传最大">
            <el-input-number
              v-model="form.file_max_size"
              @change="handleChange"
              :min="1"
              :max="1000"
              label="描述文字"
            ></el-input-number>
            MB
          </el-form-item>
          <el-form-item label="MATE描述">
            <el-input type="textarea" :rows="3" v-model="form.web_mate_content"></el-input>
          </el-form-item>
          <el-form-item label="网站版权">
            <el-input type="textarea" :rows="2" v-model="form.web_copyright"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        web_name: "EuiAdmin",
        web_link: "http://www.euiadmin.com",
        file_web_link: "http://www.euiadmin.com/public/file",
        file_max_size: 12,
        web_mate_content: 'EuiAdmin是基于Vue加Element-Ui共同构建，快速开发学习的整体后台框架。',
        web_copyright: "©2019黔1920号",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
