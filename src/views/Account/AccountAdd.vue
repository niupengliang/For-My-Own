<template>
  <Card>
    <!-- 标题 -->
    <span slot="title">添加账号</span>
    <!-- 内容 -->
    <div slot="content">
      <!-- 内容 -->
      <el-form
        :model="accAddForm"
        :rules="rules"
        style="width: 293px;"
        size="mini"
        label-width="100px"
        ref="accAddForm"
        status-icon
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="accAddForm.account"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="accAddForm.password"></el-input>
        </el-form-item>

        <el-form-item label="用户组" prop="userGroup">
          <el-select v-model="accAddForm.userGroup">
            <el-option value="普通管理员">普通管理员</el-option>
            <el-option value="超级管理员">超级管理员</el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm" type="primary">添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Card>
</template>

<script>
// 引入正则
import { ACC_REG, PWD_REG } from "@/utils/reg";
// 引入组件
import Card from "@/components/Card";
// 引入ajax函数
import { addAcc } from "@/api/account";

export default {
  components: {
    Card,
  },

  data() {
    // 验证账号
    const checkAcc = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入账号"));
      } else if (!ACC_REG.test(value)) {
        callback(new Error("3到12位（中文/字母/数字/下划线）"));
      } else {
        callback();
      }
    };

    // 验证密码
    const checkPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (!PWD_REG.test(value)) {
        callback(new Error("3到12位（字母，数字，下划线）"));
      } else {
        callback();
      }
    };

    return {
      // 添加账号表单
      accAddForm: {
        account: "",
        password: "",
        userGroup: "",
      },
      // 验证规则对象
      rules: {
        // 自定义验证
        account: { required: true, validator: checkAcc, trigger: "blur" },
        password: { required: true, validator: checkPwd, trigger: "blur" },

        // 内置验证
        userGroup: {
          required: true,
          message: "请选择用户组",
          trigger: "change",
        },
      },
    };
  },
  methods: {
    // 添加
    submitForm() {
      // 选中整个表单 调用验证方法
      this.$refs.accAddForm.validate(async (valid) => {
        if (valid) {
          let res = await addAcc(this.accAddForm); // 发送添加账号请求
          let { code } = res;
          // 判断
          if (code === 0) {
            this.$router.push("/account/account-list"); // 跳转到账号列表
          }
        } else {
          return;
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.accAddForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
</style>