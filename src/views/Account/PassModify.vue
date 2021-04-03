<template>
  <Card>
    <!-- 标题 -->
    <span slot="title">修改密码</span>
    <!-- 内容 -->
    <div slot="content">
      <el-form
        :model="passForm"
        :rules="rules"
        style="width: 293px;"
        size="mini"
        label-width="100px"
        ref="passForm"
      >
        <el-form-item label="原密码" prop="oldPwd">
          <el-input v-model="passForm.oldPwd"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="passForm.newPwd"></el-input>
        </el-form-item>

        <el-form-item label="确认新密码" prop="confirmPwd">
          <el-input v-model="passForm.confirmPwd"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm" type="primary">确定</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Card>
</template>

<script>
// 引入正则
import { PWD_REG } from "@/utils/reg";
// 引入组件
import Card from "@/components/Card";
// 引入ajax函数
import { validateOldPwd, editPwd } from "@/api/account";
// 引入local
import local from "@/utils/local";

export default {
  components: {
    Card,
  },
  data() {
    // 自定义验证旧密码
    const checkOldPwd = async (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入旧密码"));
      } else {
        // 发送ajax 问后端 是否正确
        let { code, msg } = await validateOldPwd({ oldPwd: value });
        if (code == "11") {
          callback(new Error(msg));
        } else {
          callback();
        }
      }
    };

    // 自定义验证新密码
    const checkNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("新密码不能为空"));
      } else if (!PWD_REG.test(value)) {
        callback(new Error("3到12位（字母，数字，下划线）"));
      } else {
        // 触发一致性验证
        if (this.passForm.confirmPwd !== "") {
          this.$refs.passForm.validateField("confirmPwd");
        }
        callback();
      }
    };

    // 自定义验证确认新密码
    const checkConfirmPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.passForm.newPwd) {
        callback(new Error("两次密码不一致哦"));
      } else {
        callback();
      }
    };

    return {
      // 添加账号表单
      passForm: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      // 验证规则对象
      rules: {
        oldPwd: {
          required: true,
          validator: checkOldPwd,
          trigger: "blur",
        },

        // 自定义验证
        newPwd: { required: true, validator: checkNewPwd, trigger: "blur" },
        confirmPwd: {
          required: true,
          validator: checkConfirmPwd,
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    // 修改密码
    submitForm() {
      // 选中整个表单 调用验证方法
      this.$refs.passForm.validate(async (valid) => {
        if (valid) {
          // 发送修改密码的ajax请求
          let { code } = await editPwd({ newPwd: this.passForm.newPwd });

          if (code === 0) {
            local.clear(); // 清空本地
            this.$router.push("/login"); // 跳转到登录页
          }
        } else {
          return;
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.passForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
</style>