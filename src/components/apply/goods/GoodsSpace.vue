<template>
  <el-row :gutter="20">
    <el-col
      :span="6"
      v-for="(goods, index) in goods_data"
      :key="index"
      style="margin-top: 10px"
    >
      <el-card shadow="never">
        <div slot="header">
          <span>{{ goods.goods_title }}</span>
          <el-tag :type="goods.goods_surplus_num < 10 ? 'danger' : 'success'"
            >剩余{{ goods.goods_surplus_num }}</el-tag
          >
        </div>
        <div>
          <el-popover
            placement="top-start"
            title="商品介绍"
            trigger="hover"
            :content="goods.goods_adress"
          >
            <el-image slot="reference" :src="goods.goods_src"></el-image>
          </el-popover>
        </div>
        <div align="center">
          <el-button
            size="small"
            type="danger"
            round
            icon="el-icon-shopping-cart-2"
            >￥{{ goods.goods_price }}</el-button
          >
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      goods_data: [
        {
          id: 1,
          goods_title: "胡萝卜",
          goods_src:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          goods_adress: "这是新鲜的胡萝卜，有特别的口味",
          goods_surplus_num: 125,
          goods_price: 10,
        },
        {
          id: 2,
          goods_title: "自行车",
          goods_src:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          goods_adress: "这是新鲜的胡萝卜，有特别的口味",
          goods_surplus_num: 9,
          goods_price: 10,
        },
        {
          id: 1,
          goods_title: "胡萝卜",
          goods_src:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          goods_adress: "这是新鲜的胡萝卜，有特别的口味",
          goods_surplus_num: 125,
          goods_price: 10,
        },
        {
          id: 2,
          goods_title: "自行车",
          goods_src:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          goods_adress: "这是新鲜的胡萝卜，有特别的口味",
          goods_surplus_num: 9,
          goods_price: 10,
        },
        {
          id: 1,
          goods_title: "胡萝卜",
          goods_src:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          goods_adress: "这是新鲜的胡萝卜，有特别的口味",
          goods_surplus_num: 125,
          goods_price: 10,
        },
        {
          id: 2,
          goods_title: "自行车",
          goods_src:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          goods_adress: "这是新鲜的胡萝卜，有特别的口味",
          goods_surplus_num: 9,
          goods_price: 10,
        },
        {
          id: 2,
          goods_title: "自行车",
          goods_src:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          goods_adress: "这是新鲜的胡萝卜，有特别的口味",
          goods_surplus_num: 9,
          goods_price: 10,
        },
        {
          id: 1,
          goods_title: "胡萝卜",
          goods_src:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          goods_adress: "这是新鲜的胡萝卜，有特别的口味",
          goods_surplus_num: 125,
          goods_price: 10,
        },
        {
          id: 2,
          goods_title: "自行车",
          goods_src:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          goods_adress: "这是新鲜的胡萝卜，有特别的口味",
          goods_surplus_num: 9,
          goods_price: 10,
        },
      ],
    };
  },
};
</script>