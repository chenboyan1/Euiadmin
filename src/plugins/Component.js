// 引入自写全局组件(后台)
// import AsideSpace from "@/components/system/AsideSpace";//富文本编辑器组件
// import HeadSpace from "@/components/system/HeadSpace";//富文本编辑器组件
// import EditorSpace from "@/components/module/EditorSpace";//富文本编辑器组件
// 注册全局组件
// export default {
//     AsideSpace,
//     HeadSpace,
//     EditorSpace,
// }
export default {
    AsideSpace:resolve=>{require(['@/components/system/AsideSpace'],resolve)},//这是需要引入的组件
    HeadSpace:resolve=>{require(['@/components/system/HeadSpace'],resolve)},//这是需要引入的组件
    EditorSpace:resolve=>{require(['@/components/module/EditorSpace'],resolve)},//这是需要引入的组件
    // 音乐服务部分
    EuiMusic:resolve=>{require(['@/components/system/music/EuiMusic'],resolve)},//这是需要引入的组件
    MusicControl:resolve=>{require(['@/components/system/music/sub/MusicControl'],resolve)},//这是需要引入的组件
    MusicList:resolve=>{require(['@/components/system/music/sub/MusicList'],resolve)},//这是需要引入的组件
    MusicLrc:resolve=>{require(['@/components/system/music/sub/MusicLrc'],resolve)},//这是需要引入的组件
    MusicMessageShow:resolve=>{require(['@/components/system/music/sub/MusicMessageShow'],resolve)},//这是需要引入的组件
    MusicCoverPic:resolve=>{require(['@/components/system/music/sub/MusicCoverPic'],resolve)},//这是需要引入的组件
}