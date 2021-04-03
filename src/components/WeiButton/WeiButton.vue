<template>
  <button @click="handleClick" class="wei-button" :class="classObj" :style="styleObj">
    <slot></slot>
  </button>
</template>

<script>
export default {
  // 接收参数
  props: {
    size: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },

  // 计算属性
  computed: {
    // 计算样式
    styleObj() {
      switch (this.size) {
        case "small":
          return { "min-width": "90px", height: "30px" };
          break;
        case "mini":
          return { "min-width": "60px", height: "25px" };
          break;
        default:
          return { "min-width": "100px", height: "42px" };
          break;
      }
    },
    // 计算类名
    classObj() {
      return {
        "wei-button-primary": this.type === "primary",
        "wei-button-danger": this.type === "danger",
      };
    },
  },

  //  方法
  methods: {
    handleClick() {
      // 子传父
      this.$emit("click");
    },
  },
};
</script>

<style lang="less" scoped>
.wei-button {
  width: 100px;
  height: 42px;
  background-color: green;
  border: 1px solid green;
  border-radius: 4px;
  color: #fff;
  outline: none;
  margin: 10px;
}

.wei-button-primary {
  background-color: blue;
}
.wei-button-danger {
  background-color: red;
}

.wei-button:hover {
  background-color: deeppink;
  border: 1px solid gold;
}
</style>