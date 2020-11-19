<template>
  <div>
    <el-card shadow="never" style="min-height:30vh;margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>点击选择自动上传</span>
      </div>
      <ImageUploadOne />
    </el-card>
    <el-card shadow="never" style="min-height:40vh;margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>管理上传</span>
      </div>
      <ImageUploadTwo />
    </el-card>
    <el-card shadow="never" style="min-height:30vh;margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>文字列表-单击上传</span>
      </div>
      <ImageUploadThree />
    </el-card>
    <el-card shadow="never" style="min-height:30vh;margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>拖拽上传</span>
      </div>
      <ImageUploadFour />
    </el-card>
  </div>
</template>
<script>
export default {
  components: {
    ImageUploadOne:resolve=>{require(['@/components/module/imageUpload/ImageUploadOne'],resolve)},
    ImageUploadTwo:resolve=>{require(['@/components/module/imageUpload/ImageUploadTwo'],resolve)},
    ImageUploadThree:resolve=>{require(['@/components/module/imageUpload/ImageUploadThree'],resolve)},
    ImageUploadFour:resolve=>{require(['@/components/module/imageUpload/ImageUploadFour'],resolve)},
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
#adress {
  width: 100%;
  height: 50px;
  background-color: #f2f6fc;
  margin-top: 20px;
  border-style: solid;
  border-width: 0px;
  border-left-width: 5px;
  border-left-color: #67c23a;
}
</style>