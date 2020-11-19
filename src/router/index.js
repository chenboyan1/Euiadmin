import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: resolve => require(['@/views/login/Login.vue'], resolve),
    meta: {
      title: '登录',
      vist_label: ['super_admin', 'admin', 'user']
    },
  },
  {
    path: '/register',
    name: 'register',
    component: resolve => require(['@/views/login/Register.vue'], resolve),
    meta: {
      title: '注册',
      vist_label: ['super_admin', 'admin', 'user']
    },
  },
  {
    path: '/forget/password',
    name: 'forget_password',
    component: resolve => require(['@/views/login/ForgetPassword.vue'], resolve),
    meta: {
      title: '找回密码',
      vist_label: ['super_admin', 'admin', 'user']
    },
  },
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['@/views/home/Home.vue'], resolve),
    meta: {
      title: '主页',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/module/editor',
    name: 'editor',
    component: resolve => require(['@/views/module/Editor.vue'], resolve),
    meta: {
      title: '富文本编辑器',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/module/superform',
    name: 'superform',
    component: resolve => require(['@/views/module/SuperForm.vue'], resolve),
    meta: {
      title: '超级表单',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/module/upload/image',
    name: 'image',
    component: resolve => require(['@/views/module/UploadImage.vue'], resolve),
    meta: {
      title: '图片上传',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/module/upload/file',
    name: 'file',
    component: resolve => require(['@/views/module/UploadFile.vue'], resolve),
    meta: {
      title: '文件上传',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/module/animate',
    name: 'animate',
    component: resolve => require(['@/views/module/Animate.vue'], resolve),
    meta: {
      title: 'Eui动画',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/module/table',
    name: 'table',
    component: resolve => require(['@/views/module/Table.vue'], resolve),
    meta: {
      title: '虚拟用户表格',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/module/table/excel',
    name: 'TableExcel',
    component: resolve => require(['@/views/module/TableExcel.vue'], resolve),
    meta: {
      title: '支持Excel表格',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  // Echarts表格
  {
    path: '/echarts/bar',
    name: 'echarts_bar',
    component: resolve => require(['@/views/echarts/EchartsBar.vue'], resolve),
    meta: {
      title: '柱状图',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/echarts/line',
    name: 'echarts_line',
    component: resolve => require(['@/views/echarts/EchartsLine.vue'], resolve),
    meta: {
      title: '折线图',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/echarts/map',
    name: 'echarts_map',
    component: resolve => require(['@/views/echarts/EchartsMap.vue'], resolve),
    meta: {
      title: '地图',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  // 常用页面
  {
    path: '/page/message/list',
    name: 'message_list',
    component: resolve => require(['@/views/page/MessageList.vue'], resolve),
    meta: {
      title: '留言',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/page/not/found',
    name: 'not_found',
    component: resolve => require(['@/views/page/NotFound.vue'], resolve),
    meta: {
      title: '页面不存在',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/page/warning',
    name: 'warning',
    component: resolve => require(['@/views/page/Warning.vue'], resolve),
    meta: {
      title: '系统错误',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  // 应用
  {
    path: '/apply/article',
    name: 'apply_article',
    component: resolve => require(['@/views/apply/article/Article.vue'], resolve),
    meta: {
      title: '文章撰写系统-文章',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/apply/article/label',
    name: 'apply_article_label',
    component: resolve => require(['@/views/apply/article/ArticleLabel.vue'], resolve),
    meta: {
      title: '文章撰写系统-类别',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/apply/article/reply',
    name: 'article_reply',
    component: resolve => require(['@/views/apply/article/ArticleReply.vue'], resolve),
    meta: {
      title: '文章评论回复',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  // 应用-商品列表
  {
    path: '/apply/goods',
    name: 'article_reply',
    component: resolve => require(['@/views/apply/goods/Goods.vue'], resolve),
    meta: {
      title: '文章评论回复',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/apply/goods/release',
    name: 'article_reply',
    component: resolve => require(['@/views/apply/goods/ReleaseGoods.vue'], resolve),
    meta: {
      title: '文章评论回复',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  // API管理
  {
    path: '/apply/api',
    name: 'article_reply',
    component: resolve => require(['@/views/apply/api/Api.vue'], resolve),
    meta: {
      title: 'Api列表',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/apply/api/editor',
    name: 'article_reply',
    component: resolve => require(['@/views/apply/api/EidtorApi.vue'], resolve),
    meta: {
      title: '新增修改Api',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  // 邮箱
  {
    path: '/apply/email',
    name: 'email',
    component: resolve => require(['@/views/apply/email/Email.vue'], resolve),
    meta: {
      title: '邮件管理',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  // 音乐
  {
    path: '/apply/music',
    name: 'article_music',
    component: resolve => require(['@/views/apply/music/Music.vue'], resolve),
    meta: {
      title: '音乐播放器',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  // 搜索音乐
  {
    path: '/apply/music/search',
    name: 'article_music',
    component: resolve => require(['@/views/apply/music/SearchMusic.vue'], resolve),
    meta: {
      title: '搜索音乐',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  // 榜单内音乐
  {
    path: '/apply/music/bang',
    name: 'article_music',
    component: resolve => require(['@/views/apply/music/BangMusic.vue'], resolve),
    meta: {
      title: '榜单音乐',
      login_state: false,
      vist_label: ['super_admin', 'admin']
    },
  },
  // 设置
  {
    path: '/setting/web',
    name: 'setting_seb',
    component: resolve => require(['@/views/setting/WebSetting.vue'], resolve),
    meta: {
      title: '系统设置',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/setting/email',
    name: 'setting_email',
    component: resolve => require(['@/views/setting/EmailSetting.vue'], resolve),
    meta: {
      title: '邮箱设置',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/setting/user',
    name: 'setting_user',
    component: resolve => require(['@/views/setting/UserSetting.vue'], resolve),
    meta: {
      title: '个人设置',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/setting/password',
    name: 'setting_password',
    component: resolve => require(['@/views/setting/PasswordSetting.vue'], resolve),
    meta: {
      title: '密码修改',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/download',
    name: 'setting_password',
    component: resolve => require(['@/views/Download.vue'], resolve),
    meta: {
      title: '获取Eui',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
  {
    path: '/api',
    name: 'api',
    component: resolve => require(['@/views/api/Api.vue'], resolve),
    meta: {
      title: 'Api接口',
      login_state: true,
      vist_label: ['super_admin', 'admin']
    },
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  let user_label = sessionStorage.getItem('user_label')
  let user_login = sessionStorage.getItem('user_login')
  let power = to.meta.vist_label.indexOf(user_label) //判断是否有权限
  let need_login = 'login_state' in to.meta //是否需要登录
  if (!need_login) {
    next()
    document.title = to.meta.title
  } else if (user_login == 'login' && power >= 0) {
    next()
    document.title = to.meta.title
  } else {
    alert('您未登录或权限不足')
    next({
      path: from.path
    })
  }
})

export default router