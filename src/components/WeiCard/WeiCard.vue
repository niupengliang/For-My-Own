<template>
  <div class="wei-card">
    <img :width="iconW" :height="iconH" :src="icon" alt />
    <div class="text">
      <h1>{{ title }}</h1>
      <p>{{ num }}</p>
    </div>
  </div>
</template>

<script>
export default {
  // 接收外部参数
  props: {
    icon: {
      type: String,
      required: true,
      default: "",
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
    num: {
      type: Number,
      required: true,
      default: "",
    },
    iconW: {
      type: Number,
      default: 50,
    },
    iconH: {
      type: Number,
      default: 50,
    },
  },
};
</script>

<style lang="less" scoped>
.wei-card {
  min-width: 150px;
  height: 100px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>