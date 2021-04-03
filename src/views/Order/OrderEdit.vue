<template>
  <div>订单修改</div>
</template>

<script>
import local from "@/utils/local";
import { getOrderDetail } from "@/api/order";

export default {
  async created() {
    // 1. 获取本地存储数据
    // this.orderData = local.get("row");
    // console.log("本地存储获取到的订单数据：", this.orderData);
    // 2. 接收query方式的参数
    // 发送请求 获取订单详情数据
    // let res = await getOrderDetail({ id: this.$route.query.id });
    // console.log(res);
    // 3. 接收params方式的参数
    console.log(this.$route.params);
  },
};
</script>

<style lang="less" scoped>
</style>