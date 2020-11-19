<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div style="cursor: pointer;">
          <EditorEmailSpace/>
          <p style="margin-top: 10px" @click="send_email_data()">
            <i
              class="el-icon-message"
            />&emsp;已发送邮件
          </p>
          <p style="margin-top: 10px" @click="draft_email_data()">
            <i
              class="el-icon-takeaway-box"
            />&emsp;草稿箱
          </p>
          <SettingSpace />
        </div>
      </el-col>
      <el-col :span="18">
        <SendEmailSpace :email_data="email_data" :title="email_title"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {
    SettingSpace: (resolve) => {
      require(["@/components/apply/email/sub/SettingSpace"], resolve);
    },
    SendEmailSpace: (resolve) => {
      require(["@/components/apply/email/sub/SendEmailSpace"], resolve);
    },
    EditorEmailSpace: (resolve) => {
      require(["@/components/apply/email/sub/EditorEmailSpace"], resolve);
    },
  },
  data() {
    return {
      email_title:'已发送邮件',
      email_data: [],
    };
  },
  methods: {
    send_email_data() {
      this.email_title='已发送邮件'
      this.email_data = [
        {
          id: 1,
          email_send_user_name: "张三",
          to_email: "zhangsan@163.com",
          to_email_title: "邮件测试标题",
          send_email_time: "2020-10-13 15:02:52",
        },
        {
          id: 1,
          email_send_user_name: "张三",
          to_email: "zhangsan@163.com",
          to_email_title: "邮件测试标题",
          send_email_time: "2020-10-13 15:02:52",
        },
        {
          id: 1,
          email_send_user_name: "张三",
          to_email: "zhangsan@163.com",
          to_email_title: "邮件测试标题",
          send_email_time: "2020-10-13 15:02:52",
        },
        {
          id: 1,
          email_send_user_name: "张三",
          to_email: "zhangsan@163.com",
          to_email_title: "邮件测试标题",
          send_email_time: "2020-10-13 15:02:52",
        },
        {
          id: 1,
          email_send_user_name: "张三",
          to_email: "zhangsan@163.com",
          to_email_title: "邮件测试标题",
          send_email_time: "2020-10-13 15:02:52",
        },
      ];
    },
    draft_email_data() {
      this.email_title='草稿'
      this.email_data =JSON.parse(this.$cookies.get('draft'))
      console.log(this.email_data)
    },
  },
  mounted() {
    this.send_email_data();
  },
};
</script>