<template>
  <!-- echarts -->
  <div class="myCharts" ref="myCharts" style="height: 400px; backgroundColor: #fff;"></div>
</template>

<script>
import echarts from "echarts"; // 引入echarts

export default {
  props: {
    options: {
      type: Object,
    },
  },

  methods: {
    // 绘制线图
    drawLine() {
      // 初始化
      let myCharts = echarts.init(this.$refs.myCharts);

      // 写配置
      let option = {
        // 标题
        title: {
          text: this.options.title, // 1动态数据
          textStyle: {
            color: "red",
          },
        },

        // 图例
        legend: {
          data: this.options.legend, // 2动态数据
        },

        // 工具提示
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },

        // 网格
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },

        // 工具盒子
        toolbox: {
          feature: {
            saveAsImage: {},
            dataView: {},
            magicType: {
              type: ["line", "bar"],
            },
          },
        },
        // x轴
        xAxis: {
          type: "category",
          boundaryGap: false, // 留白策略
          data: this.options.xData, // 3. 动态数据
        },
        // y轴
        yAxis: {
          type: "value",
        },
        // 核心数据
        // 4 动态数据
        series: this.options.series,
      };

      // 使用配置生成报表
      myCharts.setOption(option);
    },
  },

  mounted() {
    // 使用定时器 让绘制图的过程 在 数据赋值之后
    // setTimeout(() => {
    //   console.log("接收到外部的数据：", this.options);
    //   this.drawLine(); // 调用绘图函数
    // }, 1000);

    this.drawLine(); // 调用绘图函数
  },

  watch: {
    // 深度监听options
    options: {
      handler(newOpts, oldOpts) {
        // console.log("观察数据的变化", newOpts);
        this.drawLine(); // 重新绘制报表
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.el-col {
  margin-bottom: 30px;
}

.myCharts {
  padding: 20px;
  box-sizing: border-box;
}
</style>