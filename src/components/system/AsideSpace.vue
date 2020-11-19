<template>
  <el-aside
    :width="aside.aside_width"
    id="aside"
    :style="{ backgroundColor: aside.aside_background_color }"
  >
    <div style="height: 60px; color: #fff">
      <p style="padding-top: 10%; padding-left: 30%">{{ aside.aside_title }}</p>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      @select="change_aside_menu"
      @click="get($event)"
      :default-active="activie_index"
      :unique-opened="true"
      :background-color="aside.aside_background_color"
      :text-color="aside.aside_icon_color"
      :active-text-color="aside.aside_active_text_color"
      :collapse="aside.aside_state"
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu" :style="{ color: aside.aside_icon_color }"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i
            class="el-icon-suitcase"
            :style="{ color: aside.aside_icon_color }"
          ></i>
          <span>组件</span>
        </template>
        <el-menu-item index="/module/editor">富文本</el-menu-item>
        <el-menu-item index="/module/superform">超级表单</el-menu-item>
        <el-menu-item index="/module/upload/image">图片上传</el-menu-item>
        <el-menu-item index="/module/upload/file">文件上传</el-menu-item>
        <el-menu-item index="/module/animate">动画</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i
            class="el-icon-tickets"
            :style="{ color: aside.aside_icon_color }"
          ></i>
          <span>表格</span>
        </template>
        <el-menu-item index="/module/table">用户表格</el-menu-item>
        <el-menu-item index="/module/table/excel">支持Excel表格</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i
            class="el-icon-pie-chart"
            :style="{ color: aside.aside_icon_color }"
          ></i>
          <span>Echarts图表</span>
        </template>
        <el-menu-item index="/echarts/bar">柱状图</el-menu-item>
        <el-menu-item index="/echarts/line">折线图</el-menu-item>
        <el-menu-item index="/echarts/map">地图</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i
            class="el-icon-monitor"
            :style="{ color: aside.aside_icon_color }"
          ></i>
          <span>常用页面</span>
        </template>
        <el-menu-item index="/page/message/list">留言列表</el-menu-item>
        <el-menu-item index="/">登录</el-menu-item>
        <el-menu-item index="/register">注册</el-menu-item>
        <el-menu-item index="/forget/password">找回密码</el-menu-item>
        <el-menu-item index="/page/not/found">404页面不存在</el-menu-item>
        <el-menu-item index="/page/warning">500错误页</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i
            class="el-icon-goods"
            :style="{ color: aside.aside_icon_color }"
          ></i>
          <span>应用</span>
        </template>
        <el-submenu index="6-1">
          <template slot="title">
            <i
              class="el-icon-tickets"
              :style="{ color: aside.aside_icon_color }"
            ></i>
            <span>文章管理系统</span>
          </template>
          <el-menu-item index="/apply/article">文章撰写</el-menu-item>
          <el-menu-item index="/apply/article/label">文章类别管理</el-menu-item>
        </el-submenu>
        <el-submenu index="6-2">
          <template slot="title">
            <i
              class="el-icon-goods"
              :style="{ color: aside.aside_icon_color }"
            ></i>
            <span>商品发布系统</span>
          </template>
          <el-menu-item index="/apply/goods">商品列表</el-menu-item>
          <el-menu-item index="/apply/goods/release">发布商品</el-menu-item>
        </el-submenu>
        <el-submenu index="6-3">
          <template slot="title">
            <i
              class="el-icon-link"
              :style="{ color: aside.aside_icon_color }"
            ></i>
            <span>Api管理系统</span>
          </template>
          <el-menu-item index="/apply/api">Api列表</el-menu-item>
          <el-menu-item index="/apply/api/editor">新增Api</el-menu-item>
        </el-submenu>
        <el-menu-item index="/apply/email"
          ><i
            class="el-icon-message"
            :style="{ color: aside.aside_icon_color }"
          ></i
          >邮箱</el-menu-item
        >
        <el-menu-item index="/apply/music"
          ><i
            class="el-icon-headset"
            :style="{ color: aside.aside_icon_color }"
          ></i
          >音乐播放器</el-menu-item
        >
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i
            class="el-icon-setting"
            :style="{ color: aside.aside_icon_color }"
          ></i>
          <span>设置</span>
        </template>
        <el-menu-item-group>
          <template slot="title">网站设置</template>
          <el-menu-item index="/setting/web">网站基础设置</el-menu-item>
          <el-menu-item index="/setting/email">邮箱设置</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">个人设置</template>
          <el-menu-item index="/setting/user">个人设置</el-menu-item>
          <el-menu-item index="/setting/password">密码设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/download">
        <i
          class="el-icon-shopping-cart-full"
          :style="{ color: aside.aside_icon_color }"
        ></i>
        <span slot="title">获取源码</span>
      </el-menu-item>
      <el-menu-item index="/api">
        <i
          class="el-icon-c-scale-to-original"
          :style="{ color: aside.aside_icon_color }"
        ></i>
        <span slot="title">API接口</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
import Pass from "@/plugins/Pass.js";
export default {
  data() {
    return {
      activie_index: this.$cookies.get("activie_index"),
      aside: {
        aside_background_color: this.$cookies.get("setting")
          .aside_background_color,
        aside_text_color: this.$cookies.get("setting").aside_text_color,
        aside_icon_color: this.$cookies.get("setting").aside_icon_color,
        aside_active_text_color: this.$cookies.get("setting")
          .aside_active_text_color,
        aside_state: false,
        aside_title: this.$cookies.get("setting").aside_title,
        aside_small_title: this.$cookies.get("setting").aside_small_title,
        aside_width: this.$cookies.get("setting").aside_width + "px",
      },
    };
  },
  created() {
    Pass.$on("aside_state", (val) => {
      this.aside.aside_state = val;
      if (this.aside.aside_state) {
        this.aside.aside_width =
          this.$cookies.get("setting").aside_small_width + "px";
        this.aside.aside_title = this.$cookies.get("setting").aside_small_title;
      } else {
        this.aside.aside_width =
          this.$cookies.get("setting").aside_width + "px";
        this.aside.aside_title = this.$cookies.get("setting").aside_title;
      }
    });
  },
  methods: {
    change_aside_menu(index) {
      this.activie_index = index;
      if (index != this.$cookies.get("activie_index")) {
        this.$cookies.set("activie_index", index);
        this.$router.push(this.$cookies.get("activie_index"));
      }
    },
    get(e) {
      console.log(e.target.innerHTML);
    },
  },
  mounted() {
    if (this.$cookies.get("activie_index") == null) {
      this.$cookies.set("activie_index", 1);
      this.$router.push(this.$cookies.get("activie_index"));
    }
  },
};
</script>
<style scoped>
.el-menu {
  /* 去除右侧边框线 */
  border-right: 0 !important;
}
#aside::-webkit-scrollbar {
  display: none;
}
#aside {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>