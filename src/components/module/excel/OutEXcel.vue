<template>
  <div>
    <el-button
      slot="reference"
      type="danger"
      size="small"
      icon="el-icon-finished"
      :disabled="selection_button_state"
      @click="dialogVisible = true"
      >{{ selection_button_title }}</el-button
    >
    <el-dialog title="文件名和sheet不能为空" :visible.sync="dialogVisible">
      <div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="导出文件名">
            <el-input v-model="form.file_name"></el-input>
          </el-form-item>
          <el-form-item label="sheet名称">
            <el-input v-model="form.sheet_name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="warning" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button
          size="small"
          type="danger"
          :disabled="form.sheet_name == ''"
          @click="outExcel()"
          >确认导出</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import XLSX from "xlsx";
export default {
  props: ["selection_button_state", "selection_button_title", "selection_data"],
  data() {
    return {
      dialogVisible: false,
      form: {
        file_name: "",
        sheet_name: "",
      },
    };
  },
  methods: {
    outExcel() {
      let tableData = [
        [
          "昵称",
          "用户名",
          "用户邮箱",
          "用户电话",
          "性别",
          "用户年龄",
          "用户类别",
        ],
      ]; // 自定义表格表头
      this.selection_data.forEach((item) => {
        let rowData = [];
        rowData = [
          item.user_pet_name,
          item.user_name,
          item.user_email,
          item.user_phone,
          item.user_sex,
          item.user_age,
          item.user_label,
        ]; //每行对应的数据
        tableData.push(rowData);
      });
      let ws = XLSX.utils.aoa_to_sheet(tableData);
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, this.form.sheet_name); // 工作簿名称
      XLSX.writeFile(wb, this.form.file_name + ".xlsx"); // 保存的文件名
      this.$message.success("已导出选中数据成功，请您查看下载的excel");
    },
  },
};
</script>