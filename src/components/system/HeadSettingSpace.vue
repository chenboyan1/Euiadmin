<template>
  <div>
    <i
      class="el-icon-setting"
      @click="visible_state = true"
      :style="{ color: head_icon_color }"
    />
    <el-drawer
      title="我是标题"
      :with-header="false"
      :visible.sync="visible_state"
      size="250px"
      style="margin-top:65px"
    >
        <div id="bord">
          <p style="margin-left:10px">版本信息：</p>
          <hr style="color:#DCDFE6"/>
          <p style="margin-left:10px">版本：EuiAdmin0.5.5</p>
        </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible_state: false,
      head_icon_color: this.$cookies.get("setting").head_icon_color,
    };
  },
};
</script>
<style scoped>
a{
  word-break:break-all;
}
#bord{
  width: 100%;
  word-break:break-all;
}
</style>