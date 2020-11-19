<template>
  <div>
    <el-card shadow="never" style="min-height: 70vh">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="Api名称">
          <el-input v-model="form.api_name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="Api介绍">
          <vEditorSpace v-model="form.api_introduction" />
        </el-form-item>
        <el-form-item label="Api链接">
          <el-input v-model="form.api_link" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="Api状态">
          <el-radio-group v-model="form.api_state">
            <el-radio label="1">允许调用</el-radio>
            <el-radio label="2">禁止调用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Api调用次数">
          <el-input-number
            v-model="form.api_call_num"
            :min="1"
            :max="1000"
            label="数值"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div align="center">
        <el-button type="success" @click="add_form" v-show="add_button_sate">确认新增</el-button>
        <el-button type="danger" @click="editor_form" v-show="!add_button_sate">修改Api</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "新增Api",
      add_button_sate:true,
      form: {
        api_name: "",
        api_introduction: "",
        api_link: "",
        api_state: "1",
        api_call_num: 0,
      },
    };
  },
  methods: {
    add_form() {
      //   console.log(this.form);
      this.$router.push({
        path: "/apply/api",
        query: {
          api: this.form,
        },
      });
    },
    editor_form() {
        console.log(this.form);
      this.$router.push({
        path: "/apply/api",
        query: {
          api: this.form,
        },
      });
    },
  },
  mounted() {
    if (this.$route.query.api != undefined) {
      this.form = this.$route.query.api;
      this.title= '正在修改：'+this.form.api_name
      this.add_button_sate=false
    }
  },
};
</script>