<template>
  <div>
    <el-card shadow="never">
      <div slot="header">邮箱设置</div>
      <div style="min-height:60vh">
        <row :gutter="16">
          <el-col :span="16">
            <el-form ref="form" :model="form" label-width="130px">
              <el-form-item label="SMTP服务器地址">
                <el-input v-model="form.email_host"></el-input>
              </el-form-item>
              <el-form-item label="邮件协议形式">
                <el-input v-model="form.email_smtp_label"></el-input>
              </el-form-item>
              <el-form-item label="SSL端口号">
                <el-input-number
                  v-model="form.email_port_code"
                  @change="handleChange"
                  :min="1"
                  :max="1000"
                  label="描述文字"
                ></el-input-number>qq邮箱的ssl协议方式端口号是465/587
              </el-form-item>
              <el-form-item label="发件邮箱">
                <el-input v-model="form.email_num"></el-input>
              </el-form-item>
              <el-form-item label="邮箱授权码">
                <el-input v-model="form.eamil_empower_code" show-password></el-input>
              </el-form-item>
              <el-form-item label="发件人名称">
                <el-input v-model="form.email_send_user_name"></el-input>
              </el-form-item>
              <el-form-item label="回复收件箱">
                <el-input v-model="form.email_address_email"></el-input>
              </el-form-item>
              <div align="center">
                <el-button type="primary" @click="onSubmit()">保存设置</el-button>
              </div>
            </el-form>
          </el-col>
          <el-col :span="8" align="center">
            <i id="email" class="el-icon-message" title="邮件测试" @click="dialog_visible_state=true"></i>
            <el-dialog
              title="邮件发送测试"
              :visible.sync="dialog_visible_state"
              width="30%"
            >
              <el-form ref="form" :model="send_form" label-width="80px">
                <el-form-item label="收件箱">
                  <el-input v-model="send_form.to_email"></el-input>
                </el-form-item>
                <el-form-item label="邮件标题">
                  <el-input v-model="send_form.to_email_title"></el-input>
                </el-form-item>
                <el-form-item label="邮件内容">
                  <el-input type="textarea" :rows="2" v-model="send_form.to_email_content"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="send_email()">发送</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
        </row>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
       email_host:'@163.com',
       email_smtp_label:'ssl',
       email_port_code:465,
       email_num:'euiadmin@163.com',
       eamil_empower_code:'w123456789',
       email_send_user_name:'EuiAdmin',
       email_address_email:'12346@qq.com'
      },
      send_form:{
        to_email:'',
        to_email_title:'',
        to_email_content:''
      },
      dialog_visible_state:false
    };
  },
  methods: {
    onSubmit() {
      this.$message.success('保存设置成功')
    },
    send_email(){
      this.$message.success('发送成功')
      setTimeout(()=>{
        this.dialog_visible_state=false
      },1500)
    }
  },
};
</script>
<style scoped>
#email{
  font-size: 800%;
  color: #409EFF;
  cursor: pointer ;
}
</style>
