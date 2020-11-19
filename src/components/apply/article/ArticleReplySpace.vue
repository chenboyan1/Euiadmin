<template>
  <div>
    <el-card shadow="never">
      <div slot="header">
        <span>正在查看id:{{article_id}}《{{article_title}}》的留言</span>
      </div>
      <div>
        <el-collapse accordion>
          <el-collapse-item v-for="(user,index) in user_list_data" :key="index">
            <template slot="title">
              <el-avatar :src="user.user_avatar_src"></el-avatar>
              {{user.user_pet_name}}
              <el-tag
                size="small"
                :type="user.user_message_state=='no'?'danger':'success'"
                style="margin-left:20px"
              >{{user.user_message_state=='no'?'未回复':'已回复'}}</el-tag>
            </template>
            <div>
              <p style="word-break:break-all;">{{user.user_message_content}}</p>
              <p style="color:#909399">留言时间：{{user.user_message_time}}</p>
            </div>
            <div style="margin-top:10px">
              <el-button
                type="primary"
                size="mini"
                plain
                style="margin-left:10px"
                @click="reply(index)"
              >
                <i class="el-icon-edit" />
              </el-button>
              <el-button
                type="danger"
                size="mini"
                plain
                style="margin-left:10px"
                @click="delete_message(index)"
              >
                <i class="el-icon-delete" />
              </el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
    <el-dialog :title="'正在回复《'+dialog_title+'》的留言'" :visible.sync="dialog_visible_state" align="center">
      <el-input type="textarea" :rows="5" placeholder="请输入回复内容" v-model="reply_message"></el-input>
      <el-button type="primary" style="margin-top:20px" @click="send">确认回复</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      article_id:this.$route.query.article_id,
      article_title:this.$route.query.article_title,
      dialog_visible_state: false,
      dialog_title: "",
      reply_message:'',
      user_list_data: [
        {
          user_avatar_src:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          user_pet_name: "小明",
          user_message_content: "这是第一条留言内容",
          user_message_time: "2020/9/21 13:45:01",
          user_message_state: "no",
        },
        {
          user_avatar_src:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          user_pet_name: "李四",
          user_message_content:
            "如果输入的文字没有空格，是连续性的，那么这个时候默认不会换行的，这个时候需要拖拉到右边查看内容。如果输入的文字没有空格，是连续性的，那么这个时候默认不会换行的，这个时候需要拖拉到右边查看内容。",
          user_message_time: "2020/9/21 13:15:01",
          user_message_state: "yes",
        },
        {
          user_avatar_src:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          user_pet_name: "小明",
          user_message_content: "这是第一条留言内容",
          user_message_time: "2020/9/21 13:45:01",
          user_message_state: "no",
        },
        {
          user_avatar_src:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          user_pet_name: "李四",
          user_message_content:
            "如果输入的文字没有空格，是连续性的，那么这个时候默认不会换行的，这个时候需要拖拉到右边查看内容。如果输入的文字没有空格，是连续性的，那么这个时候默认不会换行的，这个时候需要拖拉到右边查看内容。",
          user_message_time: "2020/9/21 13:15:01",
          user_message_state: "yes",
        },
        {
          user_avatar_src:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          user_pet_name: "小明",
          user_message_content: "这是第一条留言内容",
          user_message_time: "2020/9/21 13:45:01",
          user_message_state: "no",
        },
        {
          user_avatar_src:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          user_pet_name: "李四",
          user_message_content:
            "如果输入的文字没有空格，是连续性的，那么这个时候默认不会换行的，这个时候需要拖拉到右边查看内容。如果输入的文字没有空格，是连续性的，那么这个时候默认不会换行的，这个时候需要拖拉到右边查看内容。",
          user_message_time: "2020/9/21 13:15:01",
          user_message_state: "yes",
        },
        {
          user_avatar_src:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          user_pet_name: "小明",
          user_message_content: "这是第一条留言内容",
          user_message_time: "2020/9/21 13:45:01",
          user_message_state: "no",
        },
        {
          user_avatar_src:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          user_pet_name: "李四",
          user_message_content:
            "如果输入的文字没有空格，是连续性的，那么这个时候默认不会换行的，这个时候需要拖拉到右边查看内容。如果输入的文字没有空格，是连续性的，那么这个时候默认不会换行的，这个时候需要拖拉到右边查看内容。",
          user_message_time: "2020/9/21 13:15:01",
          user_message_state: "yes",
        },
        
      ],
    };
  },
  methods: {
    reply(index) {
      this.dialog_visible_state = true;
      this.dialog_title = this.user_list_data[index].user_pet_name;
    },
    send(){
        this.$message.success("回复成功");
        setTimeout(() => {
         this.dialog_visible_state = false;
      }, 1500);
       
    },
    delete_message(index) {
      this.$message.success("删除成功");
      setTimeout(() => {
        this.user_list_data.splice(index, 1);
      }, 1500);
    },
  },
};
</script>