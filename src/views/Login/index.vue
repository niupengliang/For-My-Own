<template>
  <div class="login">
    <div class="login-container">
      <!-- 标题 -->
      <h1 class="title">系统登录</h1>

      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="60px"
        class="login-form"
        size="small"
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input
            prefix-icon="iconfont icon-zhanghao"
            v-model="loginForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            @keyup.native.enter="submitForm"
            @click.native="changeType"
            prefix-icon="iconfont icon-mima"
            :suffix-icon="visible ? 'iconfont icon-yanjing-zheng' : 'iconfont icon-yanjing_bi'"
            :type="visible ? 'text' :  'password'"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入ajax函数
import { checkLogin } from "@/api/account";
// 引入本地存储
import local from "@/utils/local";

// 创建动态路由的函数
import { createRoutes } from "@/router";

export default {
  data() {
    return {
      // 和整个表单双向绑定的的数据对象
      loginForm: {
        account: "",
        password: "",
      },

      // 验证规则
      rules: {
        // 内置验证
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        password: { required: true, message: "请输入密码", trigger: "blur" },
      },

      // 验证状态
      visible: false,
    };
  },
  methods: {
    // 切换眼睛
    changeType(e) {
      // 如果点击到的是眼睛
      if (e.target.className.includes("icon-yanjing")) {
        this.visible = !this.visible; // 取反
      }
    },

    // 提交登录表单
    submitForm() {
      // 验证整个表单的所有字段
      this.$refs.loginForm.validate(async (valid) => { 
        if (valid) {
          // 发送登录请求
          let res = await checkLogin(this.loginForm);
          let { code, role, token } = res;

          if (code === 0) {
            // 把token存入本地
            local.set("t_k", token);

            // 把角色存入本地
            local.set("role", role);

            createRoutes(); // 调用创建动态路由函数

            // 跳转到后端首页
            this.$router.push("/home");
          }
        } else {
          console.log("前端验证失败");
          return;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: url("../../assets/imgs/bg.png") no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    width: 400px;
    .title {
      text-align: center;
      margin-bottom: 30px;
      font-size: 20px;
      color: #fff;
      font-weight: 700;
    }
    .login-form {
      /deep/ .el-form-item {
        .el-form-item__label {
          color: #fff;
        }

        .el-input {
          input {
            background-color: transparent;
            color: #fff;
          }
        }

        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>