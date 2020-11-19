<template>
 <el-upload
  class="upload-demo"
  drag
  action=""
  :on-change="image_change"
  :auto-upload="false"
  :show-file-list="false">
  <i class="el-icon-upload" v-show="file==''"></i>
  <div class="el-upload__text" v-show="file==''">将文件拖到此处，或<em>点击上传</em></div>
  <el-image :src="file" v-show="file!=''"/>
</el-upload>
</template>
<script>
export default {
  data() {
    return {
      file: "",
    };
  },
  methods: {
    image_change(file) {
      this.file = URL.createObjectURL(file.raw);
      console.log(this.file)
      this.$message.success('上传图片成功')
    },
  },
};
</script>