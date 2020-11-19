<template>
  <div>
    <el-upload
      class="upload-demo"
      action
      :auto-upload="false"
      :show-file-list="false"
      :on-change="choose_file"
      style="float:left"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <i class="el-icon-setting" style="float:left;margin-left:20px" @click="setting_state=true" />
    <el-dialog title="上传文件限制条件" :visible.sync="setting_state">
      <div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="上传文件大小">
            <el-input-number v-model="form.size" :min="1" :max="2000" label="描述文字"></el-input-number>KB
          </el-form-item>
          <el-form-item label="允许文件类别">
            <el-select v-model="form.file_type" placeholder="允许限制的类别">
              <el-option
                label="word文件"
                value="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              ></el-option>
              <el-option label="图片jpg" value="image/jpg"></el-option>
              <el-option label="图片png" value="image/png"></el-option>
              <el-option label="压缩文件ZIP" value="application/x-zip-compressed"></el-option>
            </el-select>
          </el-form-item>
          <div align="center">
            <el-button type="success" @click="setting">保存设置</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      setting_state: false,
      file: "",
      form: {
        size: 20,
        file_type: "image/png",
      },
    };
  },
  methods: {
    setting() {
      this.setting_state = false;
      console.log(this.form);
    },
    choose_file(file) {
      if (file.raw.type != this.form.file_type) {
        this.$message.warning("文件格式不匹配");
      } else if (file.raw.size / 1024 > this.form.size) {
        this.$message.warning("文件过大");
      } else {
        this.file = file;
        this.$message.success('上传成功')
      console.log(file)
      }
    },
  },
};
</script>