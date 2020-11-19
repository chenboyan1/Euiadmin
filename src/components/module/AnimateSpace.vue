<template>
  <div>
    <el-card shadow="never" class="card" style="min-height:70vh">
      <div slot="header" class="clearfix">
        <span>动画 class名({{class_name}})</span>
        <el-button type="success" style="float:right" size="small" @click="setting_dialog_state = true">
          <i class="el-icon-setting" />
        </el-button>
        <el-button type="primary" style="float:right;margin-right:20px" size="small" @click="add_dialog_state = true">
          <i class="el-icon-plus" />
        </el-button>
      </div>
      <el-row :gutter="16">
        <el-col :span="10">
          <div id="menu">
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-menu-item
                v-for="(ani,index) in class_data"
                :key="index"
                @click="class_name=ani.class_name+class_delay_time+class_speed+class_repeat_num"
                :index="ani.class_name"
              >
                <i :class="ani.class_title_icon"></i>
                <span slot="title">{{ani.class_title}}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="14" align="center">
          <div align="center">
            <div id="animate_sapce" :class="class_name"></div>
          </div>
        </el-col>
      </el-row>
      <div>
          <el-link type="info" href="https://animate.style/" target="_blank">更多动画请参考Animate（单击我）</el-link>
      </div>
    </el-card>
    <el-dialog title="动画设置" :visible.sync="setting_dialog_state" width="30%">
      <el-radio-group v-model="class_delay_time">
        <el-radio label>动画不延迟</el-radio>
        <el-radio label=" animate__delay-2s">动画延迟2秒</el-radio>
        <el-radio label=" animate__delay-3s ">动画延迟3秒</el-radio>
        <el-radio label=" animate__delay-4s">动画延迟4秒</el-radio>
        <el-radio label=" animate__delay-5s">动画延迟5秒</el-radio>
      </el-radio-group>
      <el-divider />
      <el-radio-group v-model="class_speed">
        <el-radio label=" animate__faster">动画速度最快</el-radio>
        <el-radio label=" animate__fast">动画速度快</el-radio>
        <el-radio label>正常动画速度</el-radio>
        <el-radio label=" animate__slow">动画速度慢</el-radio>
        <el-radio label=" animate__slower">动画速度超慢</el-radio>
      </el-radio-group>
      <el-divider />
      <el-radio-group v-model="class_repeat_num">
        <el-radio label=" animate__repeat-1">动画循环1次</el-radio>
        <el-radio label=" animate__repeat-2">动画循环2次</el-radio>
        <el-radio label=" animate__repeat-3">动画循环3次</el-radio>
        <el-radio label=" animate__infinite	infinite">动画一直循环</el-radio>
      </el-radio-group>
    </el-dialog>
    <!-- 新增动画 -->
    <el-dialog title="新增动画" :visible.sync="add_dialog_state">
     <el-form ref="form" :model="animate_form" label-width="100px">
  <el-form-item label="动画列表图标">
    <el-input v-model="animate_form.class_title_icon" placeholder="请输入动画列表图标"></el-input>
  </el-form-item>
  <el-form-item label="动画标题">
    <el-input v-model="animate_form.class_title" placeholder="请输入动画标题"></el-input>
  </el-form-item>
  <el-form-item label="动画名称">
    <el-input v-model="animate_form.class_name" placeholder="请输入动画名称"></el-input>
  </el-form-item>
  <div align="center">
    <el-button type="success" @click="add_animate">确认新增</el-button>
  </div>
     </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      setting_dialog_state: false,
      add_dialog_state:false,
      animate_form:{
          class_title_icon:'',
          class_title:'',
          class_name:'',
      },
      class_name: "animate__animated animate__bounce",
      class_delay_time: "",
      class_speed: "",
      class_repeat_num: " animate__repeat-1",
      class_data: [
        {
          class_title_icon: "el-icon-picture-outline-round",
          class_title: "弹跳",
          class_name: "animate__animated animate__bounce",
        },
        {
          class_title_icon: "el-icon-c-scale-to-original",
          class_title: "闪烁",
          class_name: "animate__animated animate__flash ",
        },
        {
          class_title_icon: "el-icon-mobile",
          class_title: "脉冲",
          class_name: "animate__animated animate__pulse ",
        },
        {
          class_title_icon: "el-icon-pie-chart",
          class_title: "左右抖动",
          class_name: "animate__animated animate__shakeX ",
        },
        {
          class_title_icon: "el-icon-data-analysis",
          class_title: "上下抖动",
          class_name: "animate__animated animate__shakeY ",
        },
        {
          class_title_icon: "el-icon-sort-down",
          class_title: "自上入场",
          class_name: "animate__animated animate__backInDown ",
        },
        {
          class_title_icon: "el-icon-sort-up",
          class_title: "下滑退出",
          class_name: "animate__animated animate__backOutDown ",
        },
        {
          class_title_icon: "el-icon-news",
          class_title: "淡出",
          class_name: "animate__animated animate__fadeOut ",
        },
      ],
    };
  },
  methods:{
      add_animate(){
          this.animate_form.class_name='animate__animated '+this.animate_form.class_name
          this.class_data.splice(this.class_data.length,0,this.animate_form)
          this.$message.success('新增成功')
          this.add_dialog_state=false
      }
  }
};
</script>
<style scoped>
#menu {
  cursor: pointer;
  height: 60vh;
  overflow: auto;
}
#animate_sapce {
  background-color: #67c23a;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-right: 50%;
  margin-top: 20%;
  border-radius: 100px;
}
/*滚动条的宽度*/
::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}

/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
::-webkit-scrollbar-track {
  width: 6px;
  background-color: #f2f6fc;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

/*滚动条的设置*/

::-webkit-scrollbar-thumb {
  background-color: #f56c6c;
  background-clip: padding-box;
  min-height: 1px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/*滚动条移上去的背景*/

::-webkit-scrollbar-thumb:hover {
  background-color: #fff;
}
</style>