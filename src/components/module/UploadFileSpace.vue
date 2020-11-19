<template>
  <div>
    <el-card shadow="never" style="min-height:20vh;margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>单击自动上传文件</span>
      </div>
      <FileUploadOne />
    </el-card>
    <el-card shadow="never" style="min-height:20vh;margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>文件选择列表，点击文件名上传和批量上传</span>
      </div>
      <FileUploadTwo />
    </el-card>
    <el-card shadow="never" style="min-height:30vh;margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>文件拖拽自动上传</span>
      </div>
      <FileUploadThree />
    </el-card>
    <el-card shadow="never" style="min-height:30vh;margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>限制性上传（自定义允许上传类别）</span>
      </div>
      <FileUploadFour />
    </el-card>
  </div>
</template>
<script>
export default {
  components: {
    FileUploadOne:resolve=>{require(['@/components/module/fileUpload/FileUploadOne'],resolve)},
    FileUploadTwo:resolve=>{require(['@/components/module/fileUpload/FileUploadTwo'],resolve)},
    FileUploadThree:resolve=>{require(['@/components/module/fileUpload/FileUploadThree'],resolve)},
    FileUploadFour:resolve=>{require(['@/components/module/fileUpload/FileUploadFour'],resolve)}
  },
  data(){
    return{
      adress_one:'点击后自动上传，已经与后台成功交互'
    }
  }
};
</script>
<style scoped>
#adress{
  width: 100%;
  height: 50px;
  background-color: #F2F6FC;
  margin-top: 20px;
  border-style: solid;
  border-width: 0px;
  border-left-width: 5px;
  border-left-color: #67C23A;
}
</style>