<template>
  <div>
    <el-date-picker
      style="margin-bottom: 20px;"
      value-format="yyyy-MM-dd HH:mm:ss"
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>

    <el-button @click="search" type="primary">查询</el-button>
    <!-- 使用报表 -->
    <wei-line :options="options"></wei-line>
  </div>
</template>

<script>
import { getOrderTotal } from "@/api/order";
import WeiLine from "@/components/WeiLine";
import moment from "moment";

export default {
  components: {
    WeiLine,
  },

  data() {
    return {
      options: {},
      date: [],
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      let { data } = await getOrderTotal({
        date: JSON.stringify(this.date),
      });
      this.options = {
        title: "订单统计",
        lengend: "订单金额",
        xData: data.map((item) =>
          moment(item.orderTime).format("YY-MM-DD HH:mm")
        ),
        series: [
          {
            name: "订单金额",
            type: "line",
            data: data.map((item) => item.orderAmount),
          },
        ],
      };
    },
    search() {
      this.fetchData();
    },
  },
};
</script>

<style lang="less" scoped>
</style>