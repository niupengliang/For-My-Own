<template>
  <div class="header">
    <el-row :gutter="20">
      <!-- 左侧 -->
      <el-col :xs="12" :md="16" :sm="12">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in breadArr"
            :key="item.title"
            :to="{ path: item.path }"
          >{{ item.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <!-- 右侧 -->
      <el-col :xs="12" :md="8" :sm="12" class="header-right">
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand">
          <!-- 标题 -->
          <span class="el-dropdown-link">
            欢迎你，{{ account }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 下拉选项 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 头像 -->
        <el-avatar size="large" :src="imgUrl"></el-avatar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入本地
import local from "@/utils/local";
// 引入ajax函数
import { getInfo } from "@/api/account";

export default {
  data() {
    return {
      account: "小貂蝉", // 账号
      // 头像
      imgUrl: "",

      // 面包屑数组
      breadArr: [],
    };
  },
  methods: {
    // 计算面包屑数组
    calcBreadArr() {
      let arr = [{ path: "/home", title: "首页" }];

      // 计算面包屑
      this.$route.matched.forEach((item) => {
        if (item.meta && item.meta.title) {
          arr.push({
            path: item.path,
            title: item.meta.title,
          });
        }
      });

      this.breadArr = arr;
    },
    // 菜单选项点击事件
    handleCommand(command) {
      if (command === "personal") {
        this.$router.push("/account/personal");
      } else if (command === "logout") {
        this.$message({
          type: "success",
          message: "恭喜你，退出成功，欢迎下次再来, 哥哥",
        });

        local.clear(); // 清空本地
        this.$router.push("/login"); // 跳转到登录

        window.location.reload(); // 刷新 避免路由重复添加
      }
    },
    // 获取数据的函数
    async fetchInfo() {
      let { accountInfo } = await getInfo();

      local.set("info", accountInfo); // 把个人信息数据存入本地存储

      let { account, imgUrl } = accountInfo;
      this.account = account; // 渲染账号名
      this.imgUrl = imgUrl; // 渲染头像
    },
  },
  created() {
    this.calcBreadArr(); // 调用计算面包屑的函数
    this.fetchInfo(); // 调用获取个人信息的函数

    // 监听修改头像的bus事件
    this.$bus.$on("updateAavatar", () => {
      this.fetchInfo(); // 重新获取数据
    });
  },
  watch: {
    // 监听浏览器地址栏url的变化
    "$route.path"() {
      this.calcBreadArr(); // 调用计算面包屑的函数
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  flex: 0 0 60px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 20px;
  box-sizing: border-box;
  .el-row {
    .el-col {
      height: 60px;
      display: flex;
      align-items: center;
    }
    .header-right {
      display: flex;
      justify-content: flex-end;
      .el-avatar {
        margin-left: 10px;
      }
    }
  }
}
</style>