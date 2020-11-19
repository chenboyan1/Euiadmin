<template>
  <el-container id="aside">
    <vAsideSpace />
    <el-container>
      <el-header :height="head_height" :style="{backgroundColor:head_background_color}">
        <vHeadSpace />
      </el-header>
      <el-main id="main" :style="{backgroundColor:main_background_color}">
        <MusicSpace />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  components: {
    MusicSpace:resolve=>{require(['@/components/apply/music/MusicSpace'],resolve)},
  },
  data(){
      return{
          head_background_color:this.$cookies.get('setting').head_background_color,
          head_height:this.$cookies.get('setting').head_height+'px',
          main_background_color:this.$cookies.get('setting').main_background_color,
      }
  },
};
</script>
<style scoped>
#aside {
  height: 100vh;
}
#main {
  height: 100vh;
  overflow: auto;
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
  background-color: #F56C6C;
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