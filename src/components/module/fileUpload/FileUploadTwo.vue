<template>
  <div style="width:300px">
    <el-button
      size="small"
      type="primary"
      @click="upload_file_all"
      style="float:right;margin-right:20px"
    >上传所有文件到服务器</el-button>
    <el-upload
      class="upload-demo"
      action
      :auto-upload="false"
      multiple
      :on-change="choose_file"
      :file-list="file_list"
      :on-preview="click_file"
    >
      <el-button size="small" type="primary" plain>选择文件</el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      file: "",
      file_list: [],
    };
  },
  methods: {
    choose_file(file, fileList) {
      this.file = file;
      this.file_list = fileList;
    },
    click_file(file) {
      this.file = file;
      this.$message.success('上传成功')
      console.log(file)
    },
    upload_file_all() {
      for (let index = 0; index < this.file_list.length; index++) {
        this.file = this.file_list[index];
        this.$message.success('上传成功')
      console.log(this.file)
      }
    },
  },
};
</script>