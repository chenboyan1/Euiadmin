<template>
  <div>
    <!-- 功能区域 -->
    <div id="right">
      <!-- 上一曲 -->
      <i class="el-icon-back" id="last_song" @click="switch_songs('last')" />
      <!-- 音乐播放暂停控制 -->
      <!-- 音乐播放 -->
      <i
        class="el-icon-video-play"
        @click="change_play_state(true)"
        v-show="!play_state"
        id="play_icon"
        style="color: #f56c6c"
      />
      <!-- 音乐暂停 -->
      <i
        class="el-icon-video-pause"
        @click="change_play_state(false)"
        v-show="play_state"
        id="play_icon"
        style="color: #409eff"
      />
      <!-- 下一曲 -->
      <i class="el-icon-right" id="next_song" @click="switch_songs('next')" />
      <!-- 收藏-->
      <i class="el-icon-star-off" id="next_song" />
      <!-- 播放速度控制 -->
      <p @click="change_rate" id="play_rate">倍速：{{ play_rate }}</p>
      <!-- 列表 -->
      <div id="music_list">
        <vMusicList />
      </div>
      <!-- 音量控制滑块 -->
      <el-slider
        v-model="volume"
        @input="change_volume"
        vertical
        height="60px"
        id="volume"
      >
      </el-slider>
    </div>
  </div>
</template>
<script>
import Pass from "@/plugins/Pass.js";
export default {
  data() {
    return {
      play_state: false,
      volume: 50,
      play_rate: 1,
    };
  },
  created() {
    Pass.$on("music_play_sate", (music_play_sate) => {
      this.play_state = music_play_sate;
    });
  },
  methods: {
    switch_songs(label) {
      Pass.$emit('switch_songs',label)
    },
    change_play_state(state) {
      this.play_state = state;
      Pass.$emit("change_play_state", this.play_state);
    },
    change_rate() {
      //点击速度时触发该方法
      this.play_rate += 0.5;
      if (this.play_rate > 2) {
        this.play_rate = 0.5;
      }
      Pass.$emit("change_rate", this.play_rate);
    },
    change_volume() {
      Pass.$emit("change_volume", this.volume / 100);
    },
  },
};
</script>
<style scoped>
#last_song {
  font-size: 120%;
  float: left;
  position: relative;
  bottom: -30px;
}
#play_icon {
  font-size: 250%;
  float: left;
  position: relative;
  bottom: -20px;
}
#next_song {
  font-size: 120%;
  float: left;
  position: relative;
  bottom: -30px;
}
#play_rate {
  float: left;
  position: relative;
  bottom: -30px;
}
#music_list {
  float: left;
  position: relative;
  bottom: -30px;
}
#volume {
  float: left;
  position: relative;
  bottom: 10px;
}
</style>