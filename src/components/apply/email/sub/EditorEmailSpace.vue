<template>
  <div>
    <el-button
      type="success"
      icon="el-icon-edit-outline"
      style="width: 100%"
      @click="dialog_state = true"
      >撰写邮件</el-button
    >
    <el-dialog title="发送邮箱" :visible.sync="dialog_state">
      <div>
        <el-form ref="form" :model="send_data" label-width="120px">
          <el-form-item label="收件人名称">
            <el-input
              size="small"
              v-model="send_data.email_send_user_name"
              placeholder="请输入收件人名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="收件邮箱">
            <el-input
              size="small"
              v-model="send_data.to_email"
              placeholder="请输入收件邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮件标题">
            <el-input
              size="small"
              v-model="send_data.to_email_title"
              placeholder="请输入邮件标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮件内容">
            <el-input
              size="small"
              type="textarea"
              rows="5"
              v-model="send_data.to_email_content"
              placeholder="请输入邮件内容"
            ></el-input>
          </el-form-item>
        </el-form>
        <div align="center">
          <el-button
            type="warning"
            size="small"
            @click="dialog_state = false"
            icon="el-icon-close"
            >取消发送</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="save_to_draft()"
            icon="el-icon-document"
            >存入草稿</el-button
          >
          <el-button
            type="success"
            size="small"
            @click="send_email()"
            icon="el-icon-thumb"
            >发送邮件</el-button
          >
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
      draft_data:[],
      send_data: {
        to_email: "",
        email_send_user_name: "",
        to_email_title: "",
        to_email_content: "",
      },
    };
  },
  methods: {
    send_email(){
      
      // this.$message.success('发送成功')
      // this.dialog_state=false
    },
    save_to_draft() {
      var draft={
        to_email:this.send_data.to_email,
        email_send_user_name:this.send_data.email_send_user_name,
        to_email_title:this.send_data.to_email_title,
        to_email_content:this.send_data.to_email_content,
        send_email_time:this.formatDate(Date())
      }
      this.draft_data.splice(0,0,draft)
      // console.log(JSON.stringify(this.draft_data))
      this.$cookies.set('draft',JSON.stringify(this.draft_data))
      if (this.$cookies.isKey('draft')) {
        this.$message.success('存入草稿数据成功')
        setTimeout(()=>{
          this.dialog_state=false
        },1500)
      }
      // console.log(this.$cookies.get('draft'))
    },
    formatDate(time) {
      var date = new Date(time);
      var year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
      var newTime =
        year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
      return newTime;
    },
  },
  mounted() {
    if (this.$cookies.isKey("email_setting")) {
      this.email_setting = this.$cookies.get("email_setting");
    }
  },
};
</script>