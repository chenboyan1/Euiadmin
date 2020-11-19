<template>
  <!-- 头部注解：
设计于radish，主要用于实现音乐播放和控制的功能 -->
  <div>
    <div id="paly_back">
      <div>
        <!-- 音乐图片 -->
        <div id="pic">
          <vMusicCoverPic />
        </div>
        <!-- 进度条和名称显示区域 -->
        <div id="message">
          <vMusicMessageShow />
        </div>
        <div id="trol">
          <vMusicControl />
        </div>
      </div>
    </div>
    <!-- audio模块，已经使用css隐藏 -->
    <audio
      ref="audio"
      @loadedmetadata="musci_time_length"
      @timeupdate="music_played_time"
      @ended="music_play_end"
      @canplay="can_play()"
      controls
      :src="music.music_url"
      id="audio"
    ></audio>
  </div>
</template>
<script>
import Pass from "@/plugins/Pass.js";
export default {
  data() {
    return {
      play_state: false, //播放状态，切换icon的展示
      play_time: 0, //绑定播放时间
      volume: 0.5, //声音大小，这是绑定值未换算，音量值范围0-1之间
      play_rate: 1, //音乐播放速度
      play_end_state: [], //播放结束传递的参数
      music: {
        music_name: "",
        music_artist: "",
        music_url: "",
        music_pic: undefined,
        music_lrc: [],
      },
      music_playing_data: {
        music_duration_time: 0,
        music_name: "",
        music_longer_name: "",
      },
    };
  },
  created() {
    Pass.$on("music_play_data", (music_play_data) => {
      this.music=music_play_data
    });
    Pass.$on("play_sate", (play_sate) => {
      this.play(play_sate);
    });
    Pass.$on("current_time", (current_time) => {
      this.$refs.audio.currentTime = current_time;
    });
    Pass.$on("change_play_state", (play_state) => {
      this.play(play_state);
    });
    Pass.$on("change_rate", (change_rate) => {
      this.$refs.audio.playbackRate = change_rate;
    });
    Pass.$on("change_volume", (change_volume) => {
      this.$refs.audio.volume = change_volume;
    });
    Pass.$on("play_list_data", (play_list_data) => {
      this.music = play_list_data;
    });
  },
  methods: {
    can_play() {
      //音乐加载到可以播放程度自动触发播放，在拖拽、点击进度条、传递音乐参数也会自动触发该方法
      this.play(true); //auto_play是父组件传递值，等于1则向this.play传递true否则传递false
    },
    play(state) {
      //音乐播放传递state（true/false）控制播放和暂停
      if (this.music_playing_data.music_duration_time == 0) {
        //判断音乐持续时间是否等于'0:00:00'，等于则发提示表示文件不存在
        Pass.$emit("music_play_sate", false);
        this.$message.warning("未选择音乐");
        return false; //停止代码执行
      }
      if (state) {
        Pass.$emit("music_play_sate", true);
        //true执行该区域代码
        this.play_state = state; //赋值给播放状态
        this.$refs.audio.play(); //api使<audio/>播放音乐
        //赋值class名使封面图片动起来
      } else {
        Pass.$emit("music_play_sate", false);
        //false执行该代码
        this.play_state = state; //赋值给播放状态
        this.$refs.audio.pause(); //api使<audio/>暂停音乐播放 //去除封面class名称停止动画
      }
    },
    musci_time_length() {
      //获取音乐文件持续时间，并赋值给定义值
      this.music_playing_data.music_duration_time = this.$refs.audio.duration;
      this.music_playing_data.music_name = this.music.music_name;
      this.music_playing_data.music_longer_name = this.music.music_artist;
      Pass.$emit("music_message", this.music_playing_data);
      Pass.$emit("music_pic", this.music.music_pic);
      Pass.$emit("lrc", this.music.music_lrc);
    },
    music_played_time(res) {
      //自动获取已播放时长,大约200毫秒执行一次
      Pass.$emit("music_current_time", res.target.currentTime);
    },
    music_play_end() {
      //音乐播放结束会执行该方法
      this.play(false); //暂停音乐播放
      Pass.$emit("play_end", "play_end");
    },
  },
  mounted() {
    this.$refs.audio.volume = this.volume;
  },
};
</script>

<style scoped>
#audio {
  display: none;
}
#paly_back {
  cursor: pointer;
  height: 100px;
  min-width: 800px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: -1px -1px 10px #909399;
  color: #909399;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}
#pic {
  width: 80px;
  height: 80px;
  float: left;
}
#message {
  width: 300px;
  height: 80px;
  float: left;
  padding: 20px;
}
#trol {
  width: 250px;
  height: 80px;
  float: left;
  padding: 20px;
}
</style>