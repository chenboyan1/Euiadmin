<template>
  <div>
    <el-card shadow="never">
      <div slot="header">个人信息设置</div>
      <div style="min-height:60vh;width:70%">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="用户昵称">
            <el-input v-model="form.user_pet_name"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.user_name" disabled title="用户名不可修改"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="form.user_age" :min="1" :max="1000" label="描述文字"></el-input-number>岁
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio-group v-model="form.user_sex_lable">
              <el-radio label="girl">女</el-radio>
              <el-radio label="boy">男</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户类别">
            <el-select v-model="form.user_lable" placeholder="用户类别" disabled title="类别不可修改">
              <el-option label="超级管理员" value="sup_admin"></el-option>
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="作者" value="editor"></el-option>
              <el-option label="普通用户" value="user"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="form.user_phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.user_email"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" :rows="3" v-model="form.user_adress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit()">保存设置</el-button>
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
        user_pet_name: "EuiAdmin",
        user_name: "euiadmin",
        user_age: 25,
        user_sex_lable:'girl',
        user_lable: "sup_admin",
        user_phone: "13812345678",
        user_email: "euiadmin@qq.com",
        user_adress: "管理所有网站后台",
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
