<template>
  <div>
    <el-card shadow="never">
      <div slot="header">
        <span>{{ title }}</span>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品标题">
            <el-input
              v-model="form.goods_title"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品介绍">
            <vEditorSpace v-model="form.goods_adress" />
          </el-form-item>
          <el-form-item label="商品封面">
            <el-upload
              class="upload-demo"
              drag
              action=""
              :on-change="image_change"
              :auto-upload="false"
              :show-file-list="false"
              
            >
              <i class="el-icon-upload" v-show="form.goods_src==''"></i>
              <div class="el-upload__text" v-show="form.goods_src==''">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <el-image :src="form.goods_src" v-show="form.goods_src!=''"></el-image>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input-number
              v-model="form.goods_surplus_num"
              :min="1"
              :max="1000"
              label="数值"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input-number
              v-model="form.goods_price"
              :min="1"
              :max="1000"
              label="数值"
            ></el-input-number
            >￥
          </el-form-item>
        </el-form>
        <div align="center">
          <el-button type="danger">确认发布</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "商品发布中心",
      form: {
        goods_title: "",
        goods_adress: "",
        goods_surplus_num: 0,
        goods_price: 0,
        goods_src: "",
      },
    };
  },
  methods: {
    image_change(file) {
      this.form.goods_src=URL.createObjectURL(file.raw)
      console.log(file);
      this.$message.success("上传图片成功");
    },
  },
};
</script>