<template>
  <div>
    <img
      :src="music_cover_pic"
      :class="play_class"
      id="img"
    />
  </div>
</template>
<script>
import Pass from "@/plugins/Pass.js";
export default {
  data() {
    return {
        music_cover_pic:'http://api.euiadmin.com/static/uploads/image/5f8904b6b30c1.png',
        play_class:'',
    };
  },
  created() {
    Pass.$on("music_pic", (music_pic) => {
        if (music_pic!=undefined) {
            this.music_cover_pic=music_pic
        }else{
            this.music_cover_pic="http://api.euiadmin.com/static/uploads/image/5f8904b6b30c1.png"
        }
    });
     Pass.$on("music_play_sate", (music_play_sate) => {
         if (music_play_sate==1) {
             this.play_class='animate__animated animate__flipOutY animate__slow animate__infinite infinite';
         } else {
             this.play_class='';
         }
    });
  },
};
</script>
<style scoped>
#img{
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin: 10px;
}
</style>