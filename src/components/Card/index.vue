<template>
  <el-card class="box-card">
    <!-- 标题 -->
    <div slot="header" class="clearfix">
      <!-- 预留一个插槽 将来插入标题 -->
      <slot name="title" />
    </div>

    <!-- 内容 -->
    <slot name="content" />
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>