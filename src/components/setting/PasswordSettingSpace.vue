<template>
  <div>
    <el-card shadow="never">
      <div slot="header">密码修改</div>
      <div style="min-height:60vh;width:40%">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="旧密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.new_password" show-password title="6-20个字符"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="form.new_password_verify" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSubmit()">确认修改</el-button>
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
        password: "",
        new_password: "",
        new_password_verify: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
  },
};
</script>
