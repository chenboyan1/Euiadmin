<template>
  <div>
    <div>
      <el-row :gutter="20" v-loading="loading">
        <el-col
          :span="6"
          v-for="(api, index) in api_data"
          :key="index"
          style="margin-top: 10px; cursor: pointer"
        >
          <el-card shadow="never">
            <div slot="header" @click="get_api_address(index)">
              <el-tag
                :type="
                  parseInt(Math.random() * 4) == 1
                    ? 'success'
                    : parseInt(Math.random() * 4) == 2
                    ? 'info'
                    : parseInt(Math.random() * 4) == 3
                    ? 'danger'
                    : 'warning'
                "
                effect="dark"
                >{{ api.api_name }}</el-tag
              >
            </div>
            <div align="center" @click="get_api_address(index)">
              <i
                :class="api.api_icon"
                :style="{
                  fontSize: '300%',
                  color:
                    parseInt(Math.random() * 4) == 1
                      ? '#409EFF'
                      : parseInt(Math.random() * 4) == 2
                      ? '#67C23A'
                      : parseInt(Math.random() * 4) == 3
                      ? '#E6A23C'
                      : '#F56C6C',
                }"
              />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-pagination
        @size-change="page_size_change"
        @current-change="current_change"
        :current-page="page_data.current_page"
        :page-sizes="[8, 20, 50, 100]"
        :page-size="page_data.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page_data.page_total"
        id="page"
      ></el-pagination>
    </div>
    <el-dialog
      :title="dialog.dialog_title"
      :visible.sync="dialog.dialog_visible_state"
    >
      <div>
        <p>
          <span>API链接：{{ dialog.web_link }}{{ dialog.api_link }}</span
          ><el-tag :type="dialog.api_state == 'allow' ? 'success' : 'danger'" style="margin-left:20px">{{
            dialog.api_state == "allow" ? "允许调用" : "禁止调用"
          }}</el-tag>
        </p>
        <div v-html="dialog.api_intr"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: {
        dialog_visible_state: false,
        dialog_title: "",
        web_link: "http://api.euiadmin.com/index.php",
        api_link: "",
        api_state: "",
        api_intr: "",
      },
      loading: true,
      api_data: [],
      page_data: {
        page_size: 8,
        current_page: 1,
        page_total: 200,
      },
    };
  },
  methods: {
    get_api_address(index) {
      this.$message.success("正在获取详情");
      this.$axios({
        method: "post",
        url: "/api/index/adress",
        data: this.$qs.stringify({
          id: this.api_data[index].id,
        }),
      }).then((response) => {
        this.dialog.dialog_visible_state = true;
        this.dialog.dialog_title = this.api_data[index].api_name;
        this.dialog.api_link = response.data.api_link;
        this.dialog.api_state = response.data.api_state;
        this.dialog.api_intr = response.data.api_introduction;
      });
    },
    page_size_change(page_size) {
      this.page_data.page_size = page_size;
      this.$message.success("每页显示" + page_size + "条数据");
      this.get_api_data();
    },
    current_change(click_page) {
      this.page_data.current_page = click_page;
      this.$message.success("正在展示第" + click_page + "页数据");
      this.get_api_data();
    },
    get_api_data() {
      this.loading = true;
      this.$axios({
        method: "post",
        url: "/api/index/data",
        data: this.$qs.stringify({
          page_num: this.page_data.current_page,
          every_page_num: this.page_data.page_size,
        }),
      }).then((response) => {
        this.api_data = response.data.api_data;
        this.page_data.page_total = response.data.api_total;
        this.loading = false;
        // console.log(response);
      });
    },
  },
  mounted() {
    this.get_api_data();
  },
};
</script>
<style scoped>
#page {
  position: fixed;
  bottom: 70px;
}
</style>