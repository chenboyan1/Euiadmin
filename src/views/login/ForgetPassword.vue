<template>
  <div id="login">
    <div id="form_space">
      <div align="center">
        <h1>{{forget_title}}</h1>
        <p>{{forget_adress}}</p>
      </div>
      <div style="padding:20px">
        <el-form ref="form" :model="forget_form">
          <el-form-item>
            <el-input
              v-model="forget_form.user_email"
              prefix-icon="el-icon-message"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="16">
              <el-col :span="16">
                <el-input
                  v-model="forget_form.user_email_code"
                  prefix-icon="el-icon-key"
                  placeholder="请输入邮箱验证码"
                ></el-input>
              </el-col>
              <el-col :span="8">
                <el-button
                  :disabled="verify_button_data.button_state"
                  @click="verify_code()"
                >{{verify_button_data.button_title}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="forget_form.user_password"
              prefix-icon="el-icon-lock"
              show-password
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="forget_form.user_password_verify"
              prefix-icon="el-icon-lock"
              show-password
              placeholder="请再次输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item align="center">
            <el-button type="danger" icon="el-icon-thumb" @click="forget()">找回密码？</el-button>
          </el-form-item>
          <el-form-item>
            <el-link type="danger" style="float:left" @click="to('/')">登录</el-link>
            <el-link type="primary" style="float:right" @click="to('/register')">注册</el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      forget_title: "EuiAdmin",
      forget_adress: "EuiAdmin找回密码模板，极简超强开源的vue框架",
      verify_button_data: {
        button_title: "获取验证码",
        button_state: false,
      },
      forget_form: {
        user_email: "",
        user_email_code: "",
        user_password: "",
        user_password_verify: "",
      },
      remember_password: false,
    };
  },
  methods: {
    forget() {
      this.$message.success("找回密码成功");
      setTimeout(() => {
        this.$router.push("/");
      }, 1500);
    },
    verify_code() {
      this.$message.success("验证码发送成功请您查看邮箱");
      this.verify_button_data.button_title = 60;
      this.verify_button_data.button_state = true;
      this.count_time_down();
    },
    count_time_down() {
      if (this.verify_button_data.button_title != 0) {
        setTimeout(() => {
          this.verify_button_data.button_title =
            this.verify_button_data.button_title - 1;
          this.count_time_down();
        }, 1000);
      } else {
        this.verify_button_data.button_title = "再次获取验";
        this.verify_button_data.button_state = false;
      }
    },
     to(link){
      this.$router.push(link)
    }
  },
};
</script>
<style scoped>
h1 {
  color: #606266;
}
p {
  color: #606266;
}
#login {
  min-height: 100vh;
}
#form_space {
  border-radius: 10px;
  position: absolute;
  top: 20px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 600px;
  width: 400px;
}
</style>