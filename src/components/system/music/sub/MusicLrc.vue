<template>
  <div>
    <!-- 播放组件中单排歌词，基于dialog实现，通过不断更新text值实现歌词更新 -->
    <p id="lrc_one" @click="dialog_state = true">{{ text }}</p>
    <!-- 小窗口歌词写在dialog中，实现点击小歌词展开窗口歌词 -->
    <el-dialog :visible.sync="dialog_state">
      <template slot="title">
        <span id="music_lrc_title">{{ music_play_title }}</span>
      </template>
      <!-- 歌词实现原理，将歌词划分为已播放、播放中、未播放三个部分，歌词 -->
      <div style="min-height: 30vh">
        <!-- 已播放部分循环输出已播放歌词，最多5句 -->
        <p v-for="(up, i) in lrc.slice(index - 5, index)" :key="i">
          {{ up.lineLyric }}
        </p>
        <!-- 为正在播放的歌词添加样式 -->
        <p id="lrc_list">{{ text }}</p>
        <!-- 循环输出未播放后10句歌词 -->
        <p v-for="(lr, i) in lrc.slice(index + 1, index + 10)" :key="i">
          {{ lr.lineLyric }}
        </p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pass from "@/plugins/Pass.js";
export default {
  data() {
    return {
      lrc:[
        {
          lineLyric:'',
          time:0,
        }
      ],
      music_play_title: "EuiAdmin自写音乐歌词服务",//小窗口音乐标题
      dialog_state: false,//小窗口状态
      index: 0,//提取歌词数组的index值
      lrc_time: 0.0,//歌词数组对应时间
      text: "EuiAdmin暂无歌词",//歌词
    };
  },
  created(){
    Pass.$on('lrc',(lrc)=>{
     this.lrc=lrc
    })
     Pass.$on('music_current_time',(music_current_time)=>{
     this.get_lrc(Number(music_current_time.toFixed(2)))
    })
  },
  methods: {
    get_lrc(time) {
      if (time==0) {
        this.index = 0;
        this.text = this.lrc[this.index].lineLyric;//提取相应歌词
        this.lrc_time = this.lrc[this.index].time;//提取相应时间并赋值给歌词时间
      }else if (this.index>this.lrc.length-2) {//父组件传递的值，第一次为0.00
      this.text = this.lrc[this.index].lineLyric;//获取下一句歌词
        this.lrc_time = this.lrc[this.index].time;//将下一句歌词时间赋值给歌词时间
      } else if (time > this.lrc_time && time > this.lrc[this.index + 1].time) {//当已播放时间处于歌词数组小于上一次时间，大于下一次时间时执行
        this.index += 1;//当自行到这里，表示播放时间已大于现在歌词时间，index应该增1
        this.text = this.lrc[this.index].lineLyric;//获取下一句歌词
        this.lrc_time = this.lrc[this.index].time;//将下一句歌词时间赋值给歌词时间
      }
    },
  },
};
</script>
<style scoped>
#lrc_one {
  color: #f56c6c;
  cursor: pointer;
}
#lrc_list {
  color: #f56c6c;
  font-size: 120%;
}
#music_lrc_title {
  float: left;
  color: #409eff;
}
</style>