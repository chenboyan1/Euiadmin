<template>
  <div style="width:200px">
    <el-upload
      class="avatar-uploader"
      action
      :show-file-list="false"
      :auto-upload="false"
      :on-change="change_upload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon" id="icon"></i>
    </el-upload>
    <div v-show="image_link" id="link">后端链接：<br/>{{image_link}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      file: "",
      imageUrl: "",
      image_link: "",
    };
  },
  methods: {
    change_upload(file) {
      console.log(file);
      this.file = file;
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.file)
      this.$message.success('上传图片成功')
    },
  },
};
</script>
<style scoped>
#link {
  word-wrap: break-word;
  word-break:break-all;
}
.avatar-uploader {
  border: 1px dashed #dcdfe6;
  height: 20vh;
  text-align: center;
  border-radius: 5px;
}
#icon{
  margin-top: 8vh;
}
.avatar {
  height: 20vh;
  display: block;
}
</style>