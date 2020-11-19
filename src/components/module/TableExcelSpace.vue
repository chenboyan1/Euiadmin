<template>
  <div>
    <el-card shadow="never" class="card">
      <div slot="header" class="clearfix">
        <span>用户表格</span>
        <el-button
          type="success"
          size="small"
          icon="el-icon-plus"
          style="float: right"
          @click="add('dialog')"
          >新增</el-button
        >
      </div>
      <div id="charts_one" style="width: 100%; min-height: 300px">
        <OutEXcel
          :selection_button_state="selection_button_state"
          :selection_button_title="selection_button_title"
          :selection_data="selection_data"
          style="float: left"
        />
        <ImportExcel
          @excel_data="import_excel"
          style="float: left; margin-left: 10px"
        />
        <el-table
          :data="user_data"
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
            property="user_pet_name"
            label="用户昵称"
          ></el-table-column>
          <el-table-column
            property="user_name"
            label="用户名"
          ></el-table-column>
          <el-table-column
            property="user_email"
            label="用户邮箱"
          ></el-table-column>
          <el-table-column
            property="user_phone"
            label="用户电话"
          ></el-table-column>
          <el-table-column
            property="user_age"
            label="用户年龄"
          ></el-table-column>
          <el-table-column label="性别">
            <template slot-scope="scope">
              <el-tag
                size="medium"
                :type="scope.row.user_sex == '男' ? 'danger' : 'success'"
                >{{ scope.row.user_sex }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="用户类别">
            <template slot-scope="scope">
              <el-tag
                size="medium"
                :type="scope.row.user_label == '管理员' ? 'danger' : 'success'"
                effect="dark"
                >{{ scope.row.user_label }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="editor_user(scope.$index, scope.row)"
              >
                <i class="el-icon-edit-outline" />
              </el-button>
              <el-popconfirm
                confirmButtonText="确认删除"
                cancelButtonText="取消"
                confirmButtonType="danger"
                cancelButtonType="success"
                @onConfirm="delete_user(scope.$index, scope.row)"
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
    <el-dialog :title="dialog_title" :visible.sync="dialog_viside_state">
      <el-form ref="form" :model="user_form" label-width="80px">
        <el-form-item label="用户昵称">
          <el-input
            v-model="user_form.user_pet_name"
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-model="user_form.user_name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" v-show="password_input_state">
          <el-input
            v-model="user_form.user_password"
            show-password
            placeholder="请输入用户密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input
            v-model="user_form.user_email"
            placeholder="请输入用户邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input
            v-model="user_form.user_phone"
            placeholder="请输入用户电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户年纪">
          <el-input-number
            v-model="user_form.user_age"
            :min="1"
            :max="200"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="user_form.user_sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户类别">
          <el-radio-group v-model="user_form.user_label">
            <el-radio label="管理员">管理员</el-radio>
            <el-radio label="普通用户">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <div align="center">
          <el-button
            type="danger"
            size="small"
            @click="editor"
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
  components: {
    ImportExcel:resolve=>{require(['@/components/module/excel/ImportExcel.vue'],resolve)},
    OutEXcel:resolve=>{require(['@/components/module/excel/OutEXcel.vue'],resolve)},
  },
  data() {
    return {
      dialog_viside_state: false,
      password_input_state: false,
      selection_button_title: "未选择数据",
      selection_button_state: true,
      selection_data: [],
      dialog_title: "",
      user_form: {
        user_pet_name: "",
        user_name: "",
        user_password: "",
        user_email: "",
        user_phone: "",
        user_age: "",
        user_sex: "",
        user_label: "",
      },
      user_data: [],
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
          this.user_data.splice(0, 0, this.user_form);
          this.$message.success("新增成功");
          setTimeout(() => {
            this.dialog_viside_state = false;
            this.password_input_state = false;
          }, 1500);
          break;
      }
    },
    editor_user(index) {
      this.user_form = this.user_data[index];
      this.dialog_title = "修改（" + this.user_data[index].user_name + "）";
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
        this.user_data.length != select_data.length
      ) {
        this.selection_button_title = "导出已选择" + select_data.length;
        this.selection_button_state = false;
        this.selection_data = select_data;
      } else if (this.user_data.length == select_data.length) {
        this.selection_button_title = "导出全选";
        this.selection_button_state = false;
        this.selection_data = select_data;
      } else {
        this.selection_button_title = "未选择数据";
        this.selection_button_state = true;
      }
    },
    delete_user(index) {
      this.$message.warning("删除" + this.user_data[index].user_name + "成功");
      setTimeout(() => {
        this.user_data.splice(index, 1);
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
    get_user_data() {
      let user_surname = Array(
        "赵",
        "钱",
        "孙",
        "李",
        "周",
        "吴",
        "郑",
        "王",
        "冯",
        "陈",
        "褚",
        "卫",
        "蒋",
        "沈",
        "韩",
        "杨",
        "朱",
        "秦",
        "尤",
        "许",
        "何",
        "吕",
        "施",
        "张",
        "孔",
        "曹",
        "严",
        "华",
        "金",
        "魏",
        "陶",
        "姜",
        "戚",
        "谢",
        "邹",
        "喻",
        "柏",
        "水",
        "窦",
        "章",
        "云",
        "苏",
        "潘",
        "葛",
        "奚",
        "范",
        "彭",
        "郎",
        "鲁",
        "韦",
        "昌",
        "马",
        "苗",
        "凤",
        "花",
        "方",
        "任",
        "袁",
        "柳",
        "鲍",
        "史",
        "唐",
        "费",
        "薛",
        "雷",
        "贺",
        "倪",
        "汤",
        "滕",
        "殷",
        "罗",
        "毕",
        "郝",
        "安",
        "常",
        "傅",
        "卞",
        "齐",
        "元",
        "顾",
        "孟",
        "平",
        "黄",
        "穆",
        "萧",
        "尹",
        "姚",
        "邵",
        "湛",
        "汪",
        "祁",
        "毛",
        "狄",
        "米",
        "伏",
        "成",
        "戴",
        "谈",
        "宋",
        "茅",
        "庞",
        "熊",
        "纪",
        "舒",
        "屈",
        "项",
        "祝",
        "董",
        "梁",
        "杜",
        "阮",
        "蓝",
        "闵",
        "季",
        "贾",
        "路",
        "娄",
        "江",
        "童",
        "颜",
        "郭",
        "梅",
        "盛",
        "林",
        "钟",
        "徐",
        "邱",
        "骆",
        "高",
        "夏",
        "蔡",
        "田",
        "樊",
        "胡",
        "凌",
        "霍",
        "虞",
        "万",
        "支",
        "柯",
        "管",
        "卢",
        "莫",
        "柯",
        "房",
        "裘",
        "缪",
        "解",
        "应",
        "宗",
        "丁",
        "宣",
        "邓",
        "单",
        "杭",
        "洪",
        "包",
        "诸",
        "左",
        "石",
        "崔",
        "吉",
        "龚",
        "程",
        "嵇",
        "邢",
        "裴",
        "陆",
        "荣",
        "翁",
        "荀",
        "于",
        "惠",
        "甄",
        "曲",
        "封",
        "储",
        "仲",
        "伊",
        "宁",
        "仇",
        "甘",
        "武",
        "符",
        "刘",
        "景",
        "詹",
        "龙",
        "叶",
        "幸",
        "司",
        "黎",
        "溥",
        "印",
        "怀",
        "蒲",
        "邰",
        "从",
        "索",
        "赖",
        "卓",
        "屠",
        "池",
        "乔",
        "胥",
        "闻",
        "莘",
        "党",
        "翟",
        "谭",
        "贡",
        "劳",
        "逄",
        "姬",
        "申",
        "扶",
        "堵",
        "冉",
        "宰",
        "雍",
        "桑",
        "寿",
        "通",
        "燕",
        "浦",
        "尚",
        "农",
        "温",
        "别",
        "庄",
        "晏",
        "柴",
        "瞿",
        "阎",
        "连",
        "习",
        "容",
        "向",
        "古",
        "易",
        "廖",
        "庾",
        "终",
        "步",
        "都",
        "耿",
        "满",
        "弘",
        "匡",
        "国",
        "文",
        "寇",
        "广",
        "禄",
        "阙",
        "东",
        "欧",
        "利",
        "师",
        "巩",
        "聂",
        "关",
        "荆",
        "司马",
        "上官",
        "欧阳",
        "夏侯",
        "诸葛",
        "闻人",
        "东方",
        "赫连",
        "皇甫",
        "尉迟",
        "公羊",
        "澹台",
        "公冶",
        "宗政",
        "濮阳",
        "淳于",
        "单于",
        "太叔",
        "吴",
        "申屠",
        "公孙",
        "仲孙",
        "轩辕",
        "令狐",
        "徐离",
        "宇文",
        "长孙",
        "慕容",
        "司徒",
        "司空"
      );
      let name = Array(
        "伟",
        "刚",
        "勇",
        "毅",
        "俊",
        "峰",
        "强",
        "军",
        "平",
        "保",
        "东",
        "文",
        "辉",
        "力",
        "明",
        "永",
        "健",
        "世",
        "广",
        "志",
        "义",
        "兴",
        "良",
        "海",
        "山",
        "仁",
        "波",
        "宁",
        "贵",
        "福",
        "生",
        "龙",
        "元",
        "全",
        "国",
        "胜",
        "学",
        "祥",
        "才",
        "发",
        "武",
        "新",
        "利",
        "清",
        "飞",
        "彬",
        "富",
        "顺",
        "信",
        "子",
        "杰",
        "涛",
        "昌",
        "成",
        "康",
        "星",
        "光",
        "天",
        "达",
        "安",
        "岩",
        "中",
        "茂",
        "进",
        "林",
        "有",
        "坚",
        "和",
        "彪",
        "博",
        "诚",
        "先",
        "敬",
        "震",
        "振",
        "壮",
        "会",
        "思",
        "群",
        "豪",
        "心",
        "邦",
        "承",
        "乐",
        "绍",
        "功",
        "松",
        "善",
        "厚",
        "庆",
        "磊",
        "民",
        "友",
        "裕",
        "河",
        "哲",
        "江",
        "超",
        "浩",
        "亮",
        "政",
        "谦",
        "亨",
        "奇",
        "固",
        "之",
        "轮",
        "翰",
        "朗",
        "伯",
        "宏",
        "言",
        "若",
        "鸣",
        "朋",
        "斌",
        "梁",
        "栋",
        "维",
        "启",
        "克",
        "伦",
        "翔",
        "旭",
        "鹏",
        "泽",
        "晨",
        "辰",
        "士",
        "以",
        "建",
        "家",
        "致",
        "树",
        "炎",
        "德",
        "行",
        "时",
        "泰",
        "盛",
        "雄",
        "琛",
        "钧",
        "冠",
        "策",
        "腾",
        "楠",
        "榕",
        "风",
        "航",
        "弘",
        "秀",
        "娟",
        "英",
        "华",
        "慧",
        "巧",
        "美",
        "娜",
        "静",
        "淑",
        "惠",
        "珠",
        "翠",
        "雅",
        "芝",
        "玉",
        "萍",
        "红",
        "娥",
        "玲",
        "芬",
        "芳",
        "燕",
        "彩",
        "春",
        "菊",
        "兰",
        "凤",
        "洁",
        "梅",
        "琳",
        "素",
        "云",
        "莲",
        "真",
        "环",
        "雪",
        "荣",
        "爱",
        "妹",
        "霞",
        "香",
        "月",
        "莺",
        "媛",
        "艳",
        "瑞",
        "凡",
        "佳",
        "嘉",
        "琼",
        "勤",
        "珍",
        "贞",
        "莉",
        "桂",
        "娣",
        "叶",
        "璧",
        "璐",
        "娅",
        "琦",
        "晶",
        "妍",
        "茜",
        "秋",
        "珊",
        "莎",
        "锦",
        "黛",
        "青",
        "倩",
        "婷",
        "姣",
        "婉",
        "娴",
        "瑾",
        "颖",
        "露",
        "瑶",
        "怡",
        "婵",
        "雁",
        "蓓",
        "纨",
        "仪",
        "荷",
        "丹",
        "蓉",
        "眉",
        "君",
        "琴",
        "蕊",
        "薇",
        "菁",
        "梦",
        "岚",
        "苑",
        "婕",
        "馨",
        "瑗",
        "琰",
        "韵",
        "融",
        "园",
        "艺",
        "咏",
        "卿",
        "聪",
        "澜",
        "纯",
        "毓",
        "悦",
        "昭",
        "冰",
        "爽",
        "琬",
        "茗",
        "羽",
        "希",
        "欣",
        "飘",
        "育",
        "滢",
        "馥",
        "筠",
        "柔",
        "竹",
        "霭",
        "凝",
        "晓",
        "欢",
        "霄",
        "枫",
        "芸",
        "菲",
        "寒",
        "伊",
        "亚",
        "宜",
        "可",
        "姬",
        "舒",
        "影",
        "荔",
        "枝",
        "丽",
        "阳",
        "妮",
        "宝",
        "贝",
        "初",
        "程",
        "梵",
        "罡",
        "恒",
        "鸿",
        "桦",
        "骅",
        "剑",
        "娇",
        "纪",
        "宽",
        "苛",
        "灵",
        "玛",
        "媚",
        "琪",
        "晴",
        "容",
        "睿",
        "烁",
        "堂",
        "唯",
        "威",
        "韦",
        "雯",
        "苇",
        "萱",
        "阅",
        "彦",
        "宇",
        "雨",
        "洋",
        "忠",
        "宗",
        "曼",
        "紫",
        "逸",
        "贤",
        "蝶",
        "菡",
        "绿",
        "蓝",
        "儿",
        "翠",
        "烟"
      );
      let letter = Array(
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      );
      let user_data = new Array();
      for (let index = 0; index < this.page_data.page_size; index++) {
        user_data[index] = {
          user_pet_name:
            user_surname[parseInt(Math.random() * user_surname.length, 10)] +
            name[parseInt(Math.random() * name.length, 10)] +
            name[parseInt(Math.random() * name.length, 10)],
          user_name:
            letter[parseInt(Math.random() * letter.length, 10)] +
            letter[parseInt(Math.random() * letter.length, 10)] +
            letter[parseInt(Math.random() * letter.length, 10)] +
            letter[parseInt(Math.random() * letter.length, 10)] +
            letter[parseInt(Math.random() * letter.length, 10)],
          user_email: Math.ceil(Math.random() * 1000000) + "@163.com",
          user_phone: Math.ceil(Math.random() * 100000000),
          user_sex: Math.ceil(Math.random() * 10) < 5 ? "男" : "女",
          user_age: Math.ceil(Math.random() * 100),
          user_label: Math.ceil(Math.random() * 10) < 5 ? "管理员" : "普通用户",
        };
      }
      this.user_data = user_data;
    },
    import_excel(data) {
      this.user_data = data;
      this.page_data = {
        page_size: data.length,
        current_page: 1,
        page_total: data.length,
      };
    },
  },
  mounted() {
    this.get_user_data();
  },
};
</script>