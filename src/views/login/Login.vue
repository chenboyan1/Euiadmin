<template>
  <div id="login">
    <div id="form_space">
      <div align="center">
        <h1>{{ login_title }}</h1>
        <p>{{ login_adress }}</p>
      </div>
      <div style="padding: 20px">
        <el-form ref="form" :model="login_form">
          <el-form-item>
            <el-input
              v-model="login_form.user_name"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="login_form.user_password"
              prefix-icon="el-icon-lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="remember_password">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item align="center">
            <el-button type="primary" icon="el-icon-right" @click="login()"
              >登录</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-link type="danger" style="float: left" @click="to('/register')"
              >注册</el-link
            >
            <el-link
              type="primary"
              style="float: right"
              @click="to('/forget/password')"
              >找回密码？</el-link
            >
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
      login_title: "EuiAdmin",
      login_adress: "EuiAdmin登录模板，极简超强的vue框架",
      login_form: {
        user_name: "EuiAdmin",
        user_password: "12346",
      },
      remember_password: false,
    };
  },
  methods: {
    login() {
      sessionStorage.setItem("user_login", "login");
      sessionStorage.setItem("user_label", "super_admin");
      this.$message.success("登录成功");
      setTimeout(() => {
        this.$router.push("/home");
      }, 1500);
    },
    to(link) {
      this.$router.push(link);
    },
    setting_web() {
      this.color_form = {
        aside_background_color: "#000000",
        aside_text_color: "#ffffff",
        aside_icon_color: "#ffffff",
        aside_active_text_color: "#67C23A",
        aside_title: "EuiAdmin",
        aside_small_title: "Eui",
        aside_width: 200,
        aside_small_width: 65,
        head_icon_color: "#606266",
        head_background_color: "#fff",
        head_text_color: "#606266",
        head_active_text_color: "#303133",
        head_height: 60,
        main_background_color: "#f2f6fc",
      };
      this.$cookies.set("setting", JSON.stringify(this.color_form));
    },
    vist() {
      console.log(!this.$cookies.isKey("vist_label"))
      if (!this.$cookies.isKey("vist_label")) {
        this.$cookies.set("vist_label", "null",-1);
        this.$axios({
          method: "post",
          url: "/vist/ip",
          data: this.$qs.stringify({
            vist_label: this.$cookies.get("vist_label"),
          }),
        }).then(response=>{
          console.log(response)
        })
      }
    },
  },
  mounted() {
    this.vist();
    if (this.$cookies.get("setting") == null) {
      this.setting_web();
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 400px;
  width: 400px;
}
</style>