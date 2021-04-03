<template>
  <Card>
    <span slot="title">账号信息</span>
    <div slot="content">
      <p>管理员ID: {{ info.id }}</p>
      <el-divider></el-divider>
      <p>账号: {{ info.account }}</p>
      <el-divider></el-divider>
      <p>用户组: {{ info.userGroup }}</p>
      <el-divider></el-divider>
      <p>创建时间: {{ info.ctime | filterCtime }}</p>
      <el-divider></el-divider>
      <p>头像:</p>
      <!-- 头像上传组件 -->
      <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :action="uploadUrl"
        class="avatar-uploader"
      >
        <!-- 图片 -->
        <img v-if="imgUrl" :src="imgServeUrl + imgUrl" class="avatar" />
        <!-- +字架 -->
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <!-- 保存修改按钮 -->
      <el-button @click="handleEdit" type="primary" size="small">确认修改</el-button>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import local from "@/utils/local";
import moment from "moment";
import { editAvatar } from "@/api/account";

export default {
  components: {
    Card,
  },
  data() {
    return {
      imgUrl: "", // 头像地址
      uploadUrl: "http://172.16.17.254:5000/users/avatar_upload", // 发送ajax请求的地址
      imgServeUrl: "http://172.16.17.254:5000/upload/imgs/acc_img/", // 图片所在的服务器的目录
      info: {}, // 用户信息
    };
  },
  methods: {
    // 上传成功的钩子函数
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res; // 接收上传成功 后端返回的数据
      // 如果上传成功
      if (code === 0) {
        this.$message({
          type: "success",
          message: msg,
        });
        this.imgUrl = imgUrl; // 回填图片
      }
    },
    // 修改头像
    async handleEdit() {
      let { code } = await editAvatar({ imgUrl: this.imgUrl }); // 发送修改头像请求
      if (code === 0) {
        // 通知头部刷新头像【重新拉一下最新数据】
        this.$bus.$emit("updateAavatar");
      }
    },
  },
  created() {
    this.info = local.get("info"); // 取出本地数据渲染
  },
  filters: {
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.avatar-uploader .el-upload {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>