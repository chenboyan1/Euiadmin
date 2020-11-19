<template>
    <el-upload
      class="upload-demo"
      action
      :auto-upload="false"
      :show-file-list="false"
      :on-change="choose_file"
    >
      <el-button size="small" type="primary">请选择导入excel</el-button>
    </el-upload>
</template>
<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      file: "",
      excel_import_data:''
    };
  },
  methods: {
    choose_file(file) {
      this.file = file.raw;//这是element的导入数据选择，必须要添加.raw才能获取，其他表单不需要
      // console.log(file);//上传文件信息
      this.importExcel(this.file)
    },
    importExcel(file) {
      var excelData = [];
      //声明一个文件读取器
      const fileReader = new FileReader();
      //文件读取成功时触发事件
      fileReader.onload = (ev) => {
        try {
          //读取的文件;

          const data = ev.target.result;
          //以二进制流方式读取得到整份excel表格
          const workbook = XLSX.read(data, { type: "binary" });
          // 循环遍历excel的sheet对象
          Object.keys(workbook.Sheets).forEach((sheet) => {
            console.info(workbook.Sheets[sheet]["!ref"]);
            excelData.push(
              //将excel 转换成json对象放入数组中
              ...XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            );
          });
          // 自定义事件，比如校验excel数据。转换数据格式…
          console.log(excelData)//未转换key值的数据
          // this.changeKey(excelData)//调用转换key值
        } catch (e) {
          this.$message.danger('文件类型不正确');
        }
      };
      //读取文件
      fileReader.readAsBinaryString(file);
    },
    changeKey(excelData){
        var newKeyMap={//key转换字典，左侧为旧的key值。右侧为新key值
            '昵称':'user_pet_name',
            '用户名':'user_name',
            '用户邮箱':'user_email',
            '用户电话':'user_phone',
            '性别':'user_sex',
            '用户年龄':'user_age',
            '用户类别':'user_label',
        }
        for (let i = 0; i < excelData.length; i++) {//进行字典替换
            var obj = excelData[i];
            for (let key in obj) {
                var newKey=newKeyMap[key]
                if(newKey){
                    obj[newKey]=obj[key]
                    delete obj[key]
                }
            }
            
        }
        this.excel_import_data=excelData//转换成功后的数据
        console.log(this.excel_import_data)
        // this.$emit('excel_data',this.excel_import_data)//将数据传到父组件
        this.$message.success("导入成功，已为您显示到数据表格，您也可以查看console");
    }
  },
};
</script>