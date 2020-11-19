<template>
  <div>
    <div id="app">
        <vEuiMusic v-show="show_music_space" id="eui_music"/>
      <router-view />
    </div>
  </div>
</template>
<script>
import Pass from "@/plugins/Pass.js";
export default {
  data(){
    return{
      show_music_space:false
    }
  },
  created(){
    Pass.$on('show_music_space',(show_music_space)=>{
      this.show_music_space=show_music_space
      // console.log(show_music_space)
    })
  }
};
</script>
<style scoped>
#app {
  background-color: #ebeef5;
}
#eui_music{
  position: absolute;
  bottom: 20px;
  right:30px;
  min-width: 60%;
  z-index: 9999;
}
</style>

