<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="never" class="card">
          <div slot="header" class="clearfix">
            <span>柱状图动画延迟</span>
          </div>
          <div id="charts_one" style="width:100%;height:300px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" class="card">
          <div slot="header" class="clearfix">
            <span>柱状图框选</span>
          </div>
          <div id="charts_two" style="width:100%;height:300px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="12">
        <el-card shadow="never" class="card">
          <div slot="header" class="clearfix">
            <span>柱状图正负图形</span>
          </div>
          <div id="charts_three" style="width:100%;height:300px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" class="card">
          <div slot="header" class="clearfix">
            <span>柱状图堆叠</span>
          </div>
          <div id="charts_four" style="width:100%;height:300px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import "echarts/theme/macarons.js";
export default {
  data() {
    return {};
  },
  methods: {
    draw_charts_one() {
      let myChart = this.$echarts.init(
        document.getElementById("charts_one"),
        "macarons"
      );
      var xAxisData = [];
      var data1 = [];
      var data2 = [];
      for (var i = 0; i < 100; i++) {
        xAxisData.push("类目" + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      }
      myChart.setOption({
        title: {
          text: "柱状图动画延迟",
        },
        legend: {
          data: ["bar", "bar2"],
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ["stack", "tiled"],
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2,
            },
          },
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        series: [
          {
            name: "bar",
            type: "bar",
            data: data1,
            animationDelay: function (idx) {
              return idx * 10;
            },
          },
          {
            name: "bar2",
            type: "bar",
            data: data2,
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
          },
        ],
        animationEasing: "elasticOut",
        animationDelayUpdate: function (idx) {
          return idx * 5;
        },
      });
    },
    draw_charts_two() {
      let myChart = this.$echarts.init(
        document.getElementById("charts_two"),
        "macarons"
      );
      var xAxisData = [];
      var data1 = [];
      var data2 = [];
      var data3 = [];
      var data4 = [];

      for (var i = 0; i < 10; i++) {
        xAxisData.push("Class" + i);
        data1.push((Math.random() * 2).toFixed(2));
        data2.push(-Math.random().toFixed(2));
        data3.push((Math.random() * 5).toFixed(2));
        data4.push((Math.random() + 0.3).toFixed(2));
      }
      var emphasisStyle = {
        itemStyle: {
          barBorderWidth: 1,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: "rgba(0,0,0,0.5)",
        },
      };
      myChart.setOption({
        backgroundColor: "#eee",
        legend: {
          data: ["bar", "bar2", "bar3", "bar4"],
          left: 10,
        },
        brush: {
          toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
          xAxisIndex: 0,
        },
        toolbox: {
          feature: {
            magicType: {
              type: ["stack", "tiled"],
            },
            dataView: {},
          },
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          name: "X Axis",
          axisLine: { onZero: true },
          splitLine: { show: false },
          splitArea: { show: false },
        },
        yAxis: {
          inverse: true,
          splitArea: { show: false },
        },
        grid: {
          left: 100,
        },
        visualMap: {
          type: "continuous",
          dimension: 1,
          text: ["High", "Low"],
          inverse: true,
          itemHeight: 200,
          calculable: true,
          min: -2,
          max: 6,
          top: 60,
          left: 10,
          inRange: {
            colorLightness: [0.4, 0.8],
          },
          outOfRange: {
            color: "#bbb",
          },
          controller: {
            inRange: {
              color: "#2f4554",
            },
          },
        },
        series: [
          {
            name: "bar",
            type: "bar",
            stack: "one",
            emphasis: emphasisStyle,
            data: data1,
          },
          {
            name: "bar2",
            type: "bar",
            stack: "one",
            emphasis: emphasisStyle,
            data: data2,
          },
          {
            name: "bar3",
            type: "bar",
            stack: "two",
            emphasis: emphasisStyle,
            data: data3,
          },
          {
            name: "bar4",
            type: "bar",
            stack: "two",
            emphasis: emphasisStyle,
            data: data4,
          },
        ],
      });
      myChart.on("brushSelected", renderBrushed);

      function renderBrushed(params) {
        var brushed = [];
        var brushComponent = params.batch[0];

        for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
          var rawIndices = brushComponent.selected[sIdx].dataIndex;
          brushed.push("[Series " + sIdx + "] " + rawIndices.join(", "));
        }

        myChart.setOption({
          title: {
            backgroundColor: "#333",
            text: "SELECTED DATA INDICES: \n" + brushed.join("\n"),
            bottom: 0,
            right: 0,
            width: 100,
            textStyle: {
              fontSize: 12,
              color: "#fff",
            },
          },
        });
      }
    },
    draw_charts_three() {
      let myChart = this.$echarts.init(
        document.getElementById("charts_three"),
        "macarons"
      );
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["利润", "支出", "收入"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "value",
          },
        ],
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        series: [
          {
            name: "利润",
            type: "bar",
            label: {
              show: true,
              position: "inside",
            },
            data: [200, 170, 240, 244, 200, 220, 210],
          },
          {
            name: "收入",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
            },
            data: [320, 302, 341, 374, 390, 450, 420],
          },
          {
            name: "支出",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "left",
            },
            data: [-120, -132, -101, -134, -190, -230, -210],
          },
        ],
      });
    },
    draw_charts_four() {
      let myChart = this.$echarts.init(
        document.getElementById("charts_four"),
        "macarons"
      );
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: [
            "直接访问",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "搜索引擎",
            "百度",
            "谷歌",
            "必应",
            "其他",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "广告",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "搜索引擎",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              lineStyle: {
                type: "dashed",
              },
              data: [[{ type: "min" }, { type: "max" }]],
            },
          },
          {
            name: "百度",
            type: "bar",
            barWidth: 5,
            stack: "搜索引擎",
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
          {
            name: "谷歌",
            type: "bar",
            stack: "搜索引擎",
            data: [120, 132, 101, 134, 290, 230, 220],
          },
          {
            name: "必应",
            type: "bar",
            stack: "搜索引擎",
            data: [60, 72, 71, 74, 190, 130, 110],
          },
          {
            name: "其他",
            type: "bar",
            stack: "搜索引擎",
            data: [62, 82, 91, 84, 109, 110, 120],
          },
        ],
      });
    },
    draw_charts_() {
      let myChart = this.$echarts.init(
        document.getElementById("charts_two"),
        "macarons"
      );
      myChart.setOption({});
    },
  },
  mounted() {
    this.draw_charts_one();
    this.draw_charts_two();
    this.draw_charts_three();
    this.draw_charts_four();
  },
};
</script>