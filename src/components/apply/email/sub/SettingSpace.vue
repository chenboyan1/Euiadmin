<template>
  <div>
    <p style="margin-top: 10px" @click="dialog_state = true">
      <i class="el-icon-setting" />&emsp;设置
    </p>

    <el-dialog title="邮箱基础设置" :visible.sync="dialog_state">
      <div>
        <el-form ref="form" :model="email_setting" label-width="120px">
          <el-form-item label="发件邮箱">
            <el-input
              size="small"
              v-model="email_setting.email_num"
              placeholder="请输入发件邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="发件邮箱授权码">
            <el-input
              size="small"
              v-model="email_setting.eamil_empower_code"
              show-password
              placeholder="请输入发件邮箱授权码"
            ></el-input>
          </el-form-item>
          <el-form-item label="SMTP地址">
            <el-input
              size="small"
              v-model="email_setting.email_host"
              placeholder="请输入SMTP地址例如@qq.com"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱协议方式">
            <el-input
              size="small"
              v-model="email_setting.email_smtp_label"
              placeholder="请输入邮箱协议方式一般为ssl"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱发件端口">
            <el-input
              size="small"
              v-model="email_setting.email_port_code"
              placeholder="请输入邮箱发件端口，一般为465"
            ></el-input>
          </el-form-item>
          <el-form-item label="发件人名称">
            <el-input
              size="small"
              v-model="email_setting.to_email_user_name"
              placeholder="请输入邮箱发件端口，一般为465"
            ></el-input>
          </el-form-item>
          <el-form-item label="回复收件邮箱">
            <el-input
              size="small"
              v-model="email_setting.reply_email"
              placeholder="请输入回复收件邮箱"
            ></el-input>
          </el-form-item>
        </el-form>
        <div align="center">
            <el-button type="warning" @click="dialog_state=false">取消</el-button>
            <el-button type="success" @click="save_email_setting()">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog_state: false,
      email_setting: {
        email_num: "",
        eamil_empower_code: "",
        email_host: "",
        email_smtp_label: "",
        email_port_code: "",
        to_email_user_name: "",
        reply_email: "",
      },
    };
  },
  methods:{
      save_email_setting(){
          this.$cookies.set('email_setting',this.email_setting)
          if (this.$cookies.isKey('email_setting')) {
              this.$message.success('保存邮箱设置成功')
              setTimeout(()=>{
                  this.dialog_state=false
              },1500)
          } else {
              this.$message.success('保存邮箱设置失败')
          }
      }
  },
  mounted(){
      if (this.$cookies.isKey('email_setting')) {
              this.email_setting=this.$cookies.get('email_setting')
          } 
  }
};
</script>