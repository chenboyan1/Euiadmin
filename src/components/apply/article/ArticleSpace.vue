<template>
  <div>
    <el-card shadow="never">
      <div slot="header">
        <span style="flaot: right">{{ title }}</span>
        <div style="float: right">
          <el-button
            size="small"
            type="success"
            icon="el-icon-plus"
            @click="add_article()"
            >新增</el-button
          >
        </div>
      </div>
      <div v-show="!editor_state">
        <el-collapse accordion>
          <el-collapse-item
            v-for="(article, index) in article_data"
            :key="index"
          >
            <template slot="title">
              <i class="el-icon-notebook-2" />《{{ article.article_title }}》
              <el-tag
                size="small"
                :type="article.article_state == 2 ? 'danger' : 'success'"
                style="margin-left: 20px"
                >{{ article.article_state == 2 ? "未发布" : "已发布" }}</el-tag
              >
            </template>
            <div>
              <div
                style="word-break: break-all"
                v-html="article.article_content"
              ></div>
              <p style="color: #909399">
                作者{{ article.article_author }} |作者：{{
                  article.article_editor_time
                }}|<el-tag size="small" type="success">{{
                  article.article_label
                }}</el-tag>
              </p>
            </div>
            <div style="margin-top: 10px">
              <el-button
                type="primary"
                size="mini"
                plain
                style="margin-left: 10px"
                @click="editor_article(index)"
                icon="el-icon-edit"
              >
              </el-button>
              <el-button
                type="success"
                size="mini"
                plain
                icon="el-icon-chat-line-round"
                style="margin-left: 10px"
                @click="reply_message(index)"
              >
                {{ article.article_comment_num }}
              </el-button>
              <el-button
                type="danger"
                size="mini"
                plain
                icon="el-icon-delete"
                style="margin-left: 10px"
                @click="delete_message(index)"
              >
              </el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 编辑表单 -->
      <div v-show="editor_state">
        <el-form ref="form" :model="article_form" label-width="80px">
          <el-form-item label="文章标题">
            <el-input
              v-model="article_form.article_title"
              placeholder="请输入文章标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="文章内容">
            <vEditorSpace v-model="article_form.article_content" />
          </el-form-item>
          <el-form-item label="作者">
            <el-input
              v-model="article_form.article_author"
              placeholder="请输入作者名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="文章状态">
            <el-radio-group v-model="article_form.article_state">
              <el-radio label="1">发布</el-radio>
              <el-radio label="2">暂不发布</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章类别">
            <el-select
              v-model="article_form.article_label"
              placeholder="请选择"
            >
              <el-option
                v-for="rad in radio"
                :key="rad.id"
                :label="rad.label_name"
                :value="rad.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <div align="center">
            <el-button type="warning" @click="cancel()">取消</el-button>
            <el-button
              type="success"
              v-show="change_button_sate"
              @click="save_article()"
              >保存</el-button
            >
            <el-button
              type="success"
              v-show="!change_button_sate"
              @click="change_article()"
              >确认修改</el-button
            >
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user_data: "",
      title: "文章管理系统",
      editor_state: false,
      change_button_sate: false,
      article_form: {
        article_title: "",
        article_content: "",
        article_author: "",
        article_state: "2",
        article_label: "",
      },
      radio: [
        {
          id: 1,
          label: "科技",
          label_name: "科技",
        },
        {
          id: 2,
          label: "美食",
          label_name: "美食",
        },
        {
          id: 3,
          label: "文化",
          label_name: "文化",
        },
      ],
      article_data: [
        {
          id: 1,
          article_title: "什么是Vue",
          article_content: "这是“什么是Vue的内容，是直接可以显示的数据",
          article_author: "Radish",
          article_editor_time: "2020/9/21 13:45:01",
          article_label: "美食",
          article_state: "1",
          article_comment_num: 5,
        },
        {
          id: 2,
          article_title: "让你快速了解EuiAdmin",
          article_content: "快速让你了解EuiAdmin内容",
          article_author: "李四",
          article_editor_time: "2020/9/21 13:45:01",
          article_label: "科技",
          article_state: "2",
          article_comment_num: 5,
        },
      ],
    };
  },
  methods: {
    cancel() {
      this.title = "文章管理系统";
      this.editor_state = false;
    },
    add_article() {
      this.title = "新增文章";
      this.editor_state = true;
      this.change_button_sate = true;
    },
    save_article() {
      this.article_data.splice(0, 0, this.article_form);
      this.$message.success("已打印表单数据，请您打开检查查看");
      console.log(this.article_form);
      this.title = "文章管理系统";
      setTimeout(() => {
        this.editor_state = false;
      }, 1500);
    },
    editor_article(index) {
      this.title = "正在修改《" + this.article_data[index].article_title + "》";
      this.article_form = this.article_data[index];
      this.editor_state = true;
      this.change_button_sate = false;
    },
    change_article() {
      console.log(this.article_form);
      this.$message.success("已打印表单数据，请您打开检查查看");
      this.title = "文章管理系统";
      setTimeout(() => {
        this.editor_state = false;
      }, 1500);
    },
    reply_message(index){
        this.$router.push({
          path:'/apply/article/reply',
          query:{
            article_id:this.article_data[index].id,
            article_title:this.article_data[index].article_title,
          }
        })
    },
    delete_message(index) {
      this.$message.success("删除成功");
      setTimeout(() => {
        this.article_data.splice(index, 1);
      }, 1500);
    },
  },
};
</script>