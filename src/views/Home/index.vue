<template>
  <div>
    <!-- 自己封装的卡片组件 -->
    <el-row :gutter="20">
      <el-col v-for="item in cardList" :key="item.title" :md="6" :sm="12">
        <wei-card :iconW="80" :iconH="80" :icon="item.icon" :title="item.title" :num="item.num"></wei-card>
      </el-col>
    </el-row>

    <!-- 使用echarts组件 -->
    <!-- <wei-line v-if="flag" :options="options"></wei-line> -->
    <wei-line :options="options"></wei-line>
  </div>
</template>

<script>
import WeiCard from "@/components/WeiCard/WeiCard.vue";
import WeiLine from "@/components/WeiLine";
import { getOrderData } from "@/api/order";

export default {
  components: {
    WeiCard,
    WeiLine,
  },
  data() {
    return {
      // 数据占位 将来从后端接口来
      cardList: [
        {
          icon: require("../../assets/imgs/logo.png"),
          title: "总订单",
          num: 999,
        },
        {
          icon: require("../../assets/imgs/logo.png"),
          title: "总销售额",
          num: 666,
        },
        {
          icon: require("../../assets/imgs/logo.png"),
          title: "今日订单",
          num: 888,
        },
        {
          icon: require("../../assets/imgs/logo.png"),
          title: "今日销售额",
          num: 777,
        },
      ],

      // echarts动态数据
      options: {},

      flag: false,
    };
  },
  async created() {
    let res = await getOrderData(); // 获取首页数据
    let {
      // 卡片数据
      totalOrder,
      totalAmount,
      todayOrder,
      totayAmount,

      // 报表数据
      xData,
      orderData,
      amountData,
    } = res;

    // 渲染卡片
    let arr = [totalOrder, totalAmount, todayOrder, totayAmount];
    this.cardList.forEach((item, i) => (item.num = arr[i]));

    // 渲染报表
    this.options = {
      title: "数据统计",
      lengend: ["订单", "销售额"],
      xData,
      series: [orderData, amountData].map((item, index) => ({
        name: ["订单", "销售额"][index],
        type: "line",
        data: item,
      })),
    };

    // this.flag = true;
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