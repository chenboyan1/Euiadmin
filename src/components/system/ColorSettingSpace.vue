<template>
  <div>
    <i class="el-icon-magic-stick" @click="dialog_state=true" :style="{color:color_form.head_icon_color}"/>
    <el-dialog title="网站颜色设置" :visible.sync="dialog_state">
      <el-form :model="color_form" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="左侧背景色">
              <el-color-picker v-model="color_form.aside_background_color"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="左侧文字颜色">
              <el-color-picker v-model="color_form.aside_text_color"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="左侧图标颜色">
              <el-color-picker v-model="color_form.aside_icon_color"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="左侧活动菜单颜色">
              <el-color-picker v-model="color_form.aside_active_text_color"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="左侧标题">
          <el-input v-model="color_form.aside_title"></el-input>
        </el-form-item>
        <el-form-item label="左侧缩小标题">
          <el-input v-model="color_form.aside_small_title"></el-input>
        </el-form-item>
        <el-form-item label="左侧放大宽度">
          <el-input-number :min="1" :max="1000" v-model="color_form.aside_width"></el-input-number>
        </el-form-item>
        <el-form-item label="左侧缩小宽度">
          <el-input-number :min="1" :max="1000" v-model="color_form.aside_small_width"></el-input-number>
        </el-form-item>
        <el-divider />
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="顶部图标色">
              <el-color-picker v-model="color_form.head_icon_color"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="顶部背景颜色">
              <el-color-picker v-model="color_form.head_background_color"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="顶部文字颜色">
              <el-color-picker v-model="color_form.head_text_color"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动菜单颜色">
              <el-color-picker v-model="color_form.head_active_text_color"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="顶部高度">
          <el-input-number :min="1" :max="1000" v-model="color_form.head_height"></el-input-number>
        </el-form-item>
        <el-form-item label="主体区域背景色">
              <el-color-picker v-model="color_form.main_background_color"></el-color-picker>
            </el-form-item>
        <div align="center">
          <el-button type="success" size="small" @click="save_setting">保存设置</el-button>
          <el-button type="danger" size="small" style="margin-left:20px" @click="reset_setting">重置</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog_state: false,
      color_form: {
        aside_background_color: "#000000",
        aside_text_color: "#ffffff",
        aside_icon_color: "#ffffff",
        aside_active_text_color: "#67C23A",
        aside_title: "EuiAdmin",
        aside_small_title: "Eui",
        aside_width: 200,
        aside_small_width: 65,
        head_icon_color: "#606266",
        head_background_color: "#fff",
        head_text_color: "#606266",
        head_active_text_color: "#303133",
        head_height: 60,
        main_background_color:'#f2f6fc'
      },
    };
  },
  methods: {
    save_setting() {
      this.$cookies.set("setting", JSON.stringify(this.color_form));
      this.$message.success("设置成功，即将刷新");
      setTimeout(() => {
        this.dialog_state = false;
        this.$router.go(0)
      }, 1500);
    },
    reset_setting() {
      this.color_form = {
        aside_background_color: "#000000",
        aside_text_color: "#ffffff",
        aside_icon_color: "#ffffff",
        aside_active_text_color: "#67C23A",
        aside_title: "EuiAdmin",
        aside_small_title: "Eui",
        aside_width: 200,
        aside_small_width: 65,
        head_icon_color: "#606266",
        head_background_color: "#fff",
        head_text_color: "#606266",
        head_active_text_color: "#303133",
        head_height: 60,
        main_background_color:'#f2f6fc'
      };
      this.$cookies.set("setting", JSON.stringify(this.color_form));
      this.$message.success("重置成功，即将刷新");
      setTimeout(() => {
        this.dialog_state = false;
        this.$router.go(0)
      }, 1500);
    },
  },
  mounted(){
    if (this.$cookies.get('setting').head_icon_color!=null) {
      this.color_form=this.$cookies.get('setting')
    }
  }
};
</script>