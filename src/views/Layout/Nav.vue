<template>
  <div class="nav">
    <!-- logo -->
    <div class="logo-container">
      <img width="42" height="42" src="../../assets/imgs/logo.png" alt />
      <span>外卖商家中心</span>
    </div>

    <el-menu
      :default-active="curActive"
      background-color="#001529"
      text-color="#B3B9BF"
      unique-opened
      router
    >
      <template v-for="menu in menus">
        <!-- 没有下拉 -->
        <el-menu-item
          v-if="menu.children.length === 1 || menu.path == '/order'"
          :index="menu.path"
          :key="menu.path"
        >
          <i class="iconfont" :class="menu.meta.icon"></i>
          <span slot="title">{{ menu.meta.title }}</span>
        </el-menu-item>

        <!-- 有下拉 -->
        <el-submenu v-else :index="menu.path" :key="menu.path">
          <template slot="title">
            <i class="iconfont" :class="menu.meta.icon"></i>
            <span>{{ menu.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="item in menu.children"
            :key="item.path"
            :index="item.path"
          >{{item.meta.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import local from "@/utils/local";

export default {
  data() {
    return {
      menus: [], // 菜单
    };
  },
  computed: {
    // 当前激活
    curActive() {
      let path = this.$route.path;

      if (path === "/home") return "/";
      if (path === "/order/order-list" || path === "/order/order-edit")
        return "/order";
      return path;
    },
  },
  created() {
    this.menus = local.get("menus");
  },
};
</script>

<style lang="less" scoped>
.nav {
  flex: 0 0 200px;
  background-color: #001529;
  .logo-container {
    height: 60px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-menu {
    border-right: 0px;
    .el-menu-item {
      .iconfont {
        margin-right: 8px;
      }
    }
    .el-submenu {
      .el-submenu__title {
        .iconfont {
          margin-right: 8px;
        }
      }
      /deep/.el-menu {
        .el-menu-item {
          background-color: #000c17 !important;
          &:hover {
            background-color: #000c17 !important;
            color: #fff !important;
          }
        }
      }
    }
  }
}
</style>