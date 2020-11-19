<template>
  <div id="music_show" align="center">
    <!-- 歌名和歌手 -->
    <p>
      <span id="music_name">
        {{ music.music_name}}<small style="color:#606266" v-html="music.music_longer_name"></small>
      </span>
    </p>
    <!-- 歌词区域 -->
    <vMusicLrc />
    <div style="position: relative; bottom: 0px">
      <!-- 进度条滑动控制，@mousedown="play()"按鼠标左键暂停播放 -->
      <div @mousedown="pause_music()">
        <el-slider
          v-model="slider_num"
          @change="change_current_time"
          :show-tooltip="false"
          id="slider"
        ></el-slider>
      </div>
      <!-- 时间格式化显示 -->
      <p id="time">
        {{ format_date(music_current_time) }}/{{
          format_date(music.music_duration_time)
        }}
      </p>
    </div>
  </div>
</template>
<script>
import Pass from "@/plugins/Pass.js";
export default {
  data() {
    return {
      music: {
        music_duration_time: 0,
        music_name: "暂无歌曲",
        music_longer_name: "",
      },
      music_current_time: 0,
      slider_num: 0,
    };
  },
  created() {
    Pass.$on("music_message", (music_message) => {
      this.music = music_message;
    });
    Pass.$on("music_current_time", (music_current_time) => {
      this.music_current_time = music_current_time;
      this.slider_num =
        (Number(this.music_current_time) /
          Number(this.music.music_duration_time)) *
        100;
    });
  },
  methods: {
    pause_music() {
      Pass.$emit("play_sate", false);
    },
    change_current_time() {
      Pass.$emit(
        "current_time",
        (this.slider_num / 100) * this.music.music_duration_time
      );
    },
    format_date(second) {
      //格式化时间为0:00:00形式，以秒为基础
      var secondType = typeof second;
      if (secondType === "number" || secondType === "string") {
        second = parseInt(second);
        var hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        var mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        return (
          hours +
          ":" +
          ("0" + mimute).slice(-2) +
          ":" +
          ("0" + second).slice(-2)
        );
      } else {
        return "0:00:00";
      }
    },
  },
  watch: {
    music_current_time() {
      this.music_current_time =
        (this.slider_num / 100) * this.music.music_duration_time;
    },
  },
};
</script>
<style scoped>
#time {
  float: left;
  width: 50px;
}
#music_show {
  max-width: 300px;
  /* background-color: aquamarine; */
}
#music_message {
  color: #67c23a;
}
#music_name {
  color: #67c23a;
  display: block;
  max-width: 230px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#slider {
  float: left;
  width: 200px;
}
</style>