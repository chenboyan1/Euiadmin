<template>
  <div>
    <el-card shadow="never" class="card">
      <div slot="header" class="clearfix">
        <span>用户表格</span>
      </div>
      <div id="charts_one" style="width: 100%; min-height: 300px">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-finished"
          :disabled="selection_button_state"
          @click="show_selection"
          >{{ selection_button_title }}</el-button
        >
        <el-table
          :data="api_data"
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
            property="api_name"
            label="Api名称"
          ></el-table-column>
          <el-table-column label="api介绍">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                title="Api使用介绍"
                width="200"
                trigger="hover"
              >
              <div v-html="scope.row.api_introduction"></div>
                <el-tag type="danger" slot="reference">Api介绍</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            property="api_link"
            label="Api链接"
          ></el-table-column>
          <el-table-column label="Api链接状态">
            <template slot-scope="scope">
              <el-tag
                size="medium"
                :type="scope.row.api_state == '1' ? 'success' : 'danger'"
                >{{
                  scope.row.api_state == "1" ? "允许调用" : "禁止调用"
                }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="Api调用次数">
            <template slot-scope="scope">
              {{ scope.row.api_call_num }}
              <el-progress
                :percentage="(scope.row.api_call_num / api_all_num* 100).toFixed(2)"
                type="line"
              ></el-progress>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="editor(scope.$index, scope.row)"
              >
                <i class="el-icon-edit-outline" />
              </el-button>
              <el-popconfirm
                confirmButtonText="确认删除"
                cancelButtonText="取消"
                confirmButtonType="danger"
                cancelButtonType="success"
                @onConfirm="delete_api(scope.$index, scope.row)"
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
          :page-sizes="[10, 20, 50, 100]"
          :page-size="page_data.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page_data.page_total"
          style="margin-top: 10px"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selection_button_title: "未选择数据",
      selection_button_state: true,
      selection_data: [],
      page_data: {
        page_size: 10,
        current_page: 1,
        page_total: 200,
      },
      api_data: [
        {
          id: 1,
          api_name: "虚拟用户",
          api_introduction: "这是介绍",
          api_link: "user/index",
          api_state: "1",
          api_call_num: 125,
        },
        {
          id: 2,
          api_name: "登录",
          api_introduction: "这是登录接口介绍",
          api_link: "login",
          api_state: "2",
          api_call_num: 12,
        },
      ],
      api_all_num:0,
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
          this.user_data.splice(0, 0, this.user_form);
          this.$message.success("新增成功");
          setTimeout(() => {
            this.dialog_viside_state = false;
            this.password_input_state = false;
          }, 1500);
          break;
      }
    },
    editor(index) {
      this.$router.push({
          path:'/apply/api/editor',
          query:{
              api:this.api_data[index]
          }
      })
    },
    selection(select_data) {
      if (
        select_data.length > 0 &&
        this.api_data.length != select_data.length
      ) {
        this.selection_button_title = "已选择" + select_data.length;
        this.selection_button_state = false;
        this.selection_data = select_data;
      } else if (this.api_data.length == select_data.length) {
        this.selection_button_title = "已全选";
        this.selection_button_state = false;
        this.selection_data = select_data;
      } else {
        this.selection_button_title = "未选择数据";
        this.selection_button_state = true;
      }
    },
    delete_api(index) {
      this.$message.warning("删除" + this.api_data[index].api_name + "成功");
      setTimeout(() => {
        this.api_data.splice(index, 1);
      }, 1500);
    },
    show_selection() {
      this.$message.success("已打印选择数据成功，请打开检查查看");
      console.log(this.api_data);
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
    get_api_all_num() {
        for (let index = 0; index < this.api_data.length; index++) {
            this.api_all_num += this.api_data[index].api_call_num;
        }
    },
  },
  mounted(){
      this.get_api_all_num()
      if (this.$route.query.api!=undefined) {
        this.api_data.splice(0,0,this.$route.query.api)
      }
  }
};
</script>