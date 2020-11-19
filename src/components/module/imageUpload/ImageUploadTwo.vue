<template>
  <div>
    <el-upload
      action="#"
      :on-change="choose_file"
      :file-list="fileList"
      list-type="picture-card"
      :auto-upload="false"
      style="float:left"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="image_down(file)">
            <i class="el-icon-download"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="upload_image(file)">
            <i class="el-icon-top"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="image_delete(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-button type="primary" @click="upload_image_all" style="float:left;margin-left:20px">上传所有选择图片</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      file: "",
      fileList: [],
    };
  },
  methods: {
    choose_file(file, fileList) {
      this.file = file;
      this.fileList = fileList;
      console.log(file)
      console.log(fileList)
    },
    image_delete(file) {
      for (let index = 0; index < this.fileList.length; index++) {
        if (this.fileList[index] == file) {
          //  console.log(index)
          this.fileList.splice(index, 1);
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    image_down(file) {
      window.open(file.url);
    },
    upload_image(file) {
      this.file = file;
    },
    upload_image_all() {
      for (let index = 0; index < this.fileList.length; index++) {
        this.file = this.fileList[index];
      }
    },
  },
};
</script>