<template>
  <div>
    <el-row :gutter="20">
      <el-col v-for="(car,index) in web_card_data" :key="index" :span="6">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span>
              <i :class="car.card_title_icon" />
              {{car.card_title}}
            </span>
            <div id="cycle" :style="{backgroundColor:car.card_cycle_back_color}">{{car.card_cycle}}</div>
          </div>
          <div>
            <h1 style="font-size:150%;color:#909399">{{car.vist_num}}</h1>
            <br />
            <p style="float:left;color:#909399">{{car.bottom_title}}</p>
            <p style="float:right;color:#909399">
              {{car.vist_all_num}}万
              <i :class="car.vist_all_icon" />
            </p>
          </div>
          <br />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      web_card_data: [
        {
          card_title_icon: "el-icon-user",
          card_title: "访问",
          card_cycle: "年",
          card_cycle_back_color: "#409EFF",
          bottom_title: "访问总量",
          vist_num: Math.ceil(Math.random() * 100000),
          vist_all_num: Math.ceil(Math.random() * 100),
          vist_all_icon: "el-icon-trophy",
        },
        {
          card_title_icon: "el-icon-download",
          card_title: "下载",
          card_cycle: "月",
          card_cycle_back_color: "#67C23A",
          bottom_title: "下载总量",
          vist_num: Math.ceil(Math.random() * 100000),
          vist_all_num: Math.ceil(Math.random() * 100),
          vist_all_icon: "el-icon-download",
        },
        {
          card_title_icon: "el-icon-wallet",
          card_title: "收入",
          card_cycle: "日",
          card_cycle_back_color: "#F56C6C",
          bottom_title: "总收入",
          vist_num: Math.ceil(Math.random() * 100000),
          vist_all_num: Math.ceil(Math.random() * 100),
          vist_all_icon: "el-icon-coin",
        },
        {
          card_title_icon: "el-icon-coordinate",
          card_title: "用户",
          card_cycle: "月",
          card_cycle_back_color: "#E6A23C",
          bottom_title: "总用户",
          vist_num: Math.ceil(Math.random() * 100000),
          vist_all_num: Math.ceil(Math.random() * 100),
          vist_all_icon: "el-icon-data-line",
        },
      ],
    };
  },
};
</script>
<style scoped>
#cycle {
  width: 30px;
  height: 25px;
  float: right;
  border-radius: 3px;
  color: white;
  padding-left: 10px;
}
</style>