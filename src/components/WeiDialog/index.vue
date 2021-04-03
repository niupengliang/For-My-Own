<template>
  <div class="wei-dialog" v-show="visible">
    <div class="dialog-container">
      <header>
        <span>{{ title }}</span>
        <span @click="closeDialog">x</span>
      </header>
      <main>
        <!-- 将来内容在这里 -->
        <slot />
      </main>
      <footer>
        <!-- 将来尾部的内容 插入这里 -->
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  // 参数设计
  props: {
    // 标题
    title: {
      type: String,
    },
    // 显示或隐藏
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      // 子传父 告诉父亲：爸爸 我要关闭
      this.$emit("handle-close");
    },
  },
};
</script>

<style lang="less" scoped>
.wei-dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 666;
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog-container {
    width: 60%;
    min-height: 320px;
    background-color: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    header {
      flex: 0 0 30px;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }
    main {
      flex: 1;
      padding: 20px;
    }
    footer {
      border-top: 1px solid #ccc;
      flex: 0 0 40px;
    }
  }
}
</style>