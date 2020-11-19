<template>
  <div>
    <el-card shadow="never" class="card">
      <div slot="header" class="clearfix">
        <span>文章类别</span>
        <el-button
          type="success"
          size="small"
          icon="el-icon-plus"
          style="float: right"
          @click="add('dialog')"
          >新增</el-button
        >
      </div>
      <el-button size="small" type="danger" :disabled="selection_button_title=='未选择数据'" icon="">{{selection_button_title}}</el-button>
      <div id="charts_one" style="width: 100%; min-height: 300px">
        <el-table
          :data="article_label_data"
          max-height="350"
          @selection-change="selection"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            property="label_name"
            label="类别名称"
          ></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="editor_label(scope.$index, scope.row)"
              >
                <i class="el-icon-edit-outline" />
              </el-button>
              <el-popconfirm
                confirmButtonText="确认删除"
                cancelButtonText="取消"
                confirmButtonType="danger"
                cancelButtonType="success"
                @onConfirm="delete_label(scope.$index, scope.row)"
                title="这是一段内容确定删除吗？"
              >
                <el-button size="mini" slot="reference" type="danger">
                  <i class="el-icon-delete" />
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="page_size_change"
          @current-change="current_change"
          :current-page="page_data.current_page"
          :page-sizes="[10, 20, 50, 100, 200, 500]"
          :page-size="page_data.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page_data.page_total"
          style="margin-top: 10px"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog :title="dialog_title" width="30%" :visible.sync="dialog_viside_state">
      <el-form ref="form" :model="label_form" label-width="80px">
        <el-form-item label="类别名称">
          <el-input
            v-model="label_form.label_name"
            placeholder="请输入类别名称"
          ></el-input>
        </el-form-item>
        <div align="center">
          <el-button
            type="danger"
            size="small"
            @click="editor()"
            v-show="!password_input_state"
            >确认修改</el-button
          >
          <el-button
            type="success"
            size="small"
            @click="add('add')"
            v-show="password_input_state"
            >确认新增</el-button
          >
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog_viside_state: false,
      password_input_state: false,
      selection_button_title: "未选择数据",
      selection_button_state: true,
      selection_data: [],
      dialog_title: "",
      label_form: {
        label_name: "",
      },
      article_label_data: [
          {
              id:1,
              label_name:'科技'
          },
          {
              id:2,
              label_name:'文化'
          },
          {
              id:3,
              label_name:'历史'
          },
          {
              id:4,
              label_name:'美食'
          },
      ],
      page_data: {
        page_size: 10,
        current_page: 1,
        page_total: 500,
      },
      excel_name: "",
    };
  },
  methods: {
    add(key) {
      switch (key) {
        case "dialog":
          this.dialog_viside_state = true;
          this.password_input_state = true;
          break;
        case "add":
          this.article_label_data.splice(0, 0, this.label_form);
          this.$message.success("新增成功");
          setTimeout(() => {
            this.dialog_viside_state = false;
            this.password_input_state = false;
          }, 1500);
          break;
      }
    },
    editor_label(index) {
      this.label_form = this.article_label_data[index];
      this.dialog_title = "修改（" + this.article_label_data[index].label_name + "）";
      this.dialog_viside_state = true;
    },
    editor() {
      this.$message.success("修改成功");
      setTimeout(() => {
        this.dialog_viside_state = false;
      }, 1500);
    },
    selection(select_data) {
      if (
        select_data.length > 0 &&
        this.article_label_data.length != select_data.length
      ) {
        this.selection_button_title = "已选择" + select_data.length+'条数据';
        this.selection_button_state = false;
        this.selection_data = select_data;
      } else if (this.article_label_data.length == select_data.length) {
        this.selection_button_title = "已全选";
        this.selection_button_state = false;
        this.selection_data = select_data;
      } else {
        this.selection_button_title = "未选择数据";
        this.selection_button_state = true;
      }
    },
    delete_label(index) {
      this.$message.warning("删除" + this.article_label_data[index].label_name + "成功");
      setTimeout(() => {
        this.article_label_data.splice(index, 1);
      }, 1500);
    },
    page_size_change(page_size) {
      this.page_data.page_size = page_size;
      this.$message.success("每页显示" + page_size + "条数据");
      this.get_user_data();
    },
    current_change(click_page) {
      this.page_data.current_page = click_page;
      this.$message.success("正在展示第" + click_page + "页数据");
      this.get_user_data();
    },
  },
};
</script>