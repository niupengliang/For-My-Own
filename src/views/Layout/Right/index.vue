<template>
  <div class="right">
    <!-- 头部 -->
    <Header />

    <!-- 主体 -->
    <div class="main">
      <!-- 路由出口 -->
      <router-view />
    </div>
  </div>
</template>

<script>
// 引入组件
import Header from "./Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="less" scoped>
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  .main {
    flex: 1;
    padding: 20px;
    overflow-y: scroll;
  }
}
</style>