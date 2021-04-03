<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <Nav />

    <!-- 右侧 -->
    <Right />
  </div>
</template>

<script>
// 引入组件
import Nav from "@/views/Layout/Nav.vue";
import Right from "@/views/Layout/Right";

export default {
  // 注册
  components: {
    Nav,
    Right,
  },
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  display: flex;
}
</style>