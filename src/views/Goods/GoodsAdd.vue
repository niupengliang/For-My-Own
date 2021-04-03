<template>
  <Card>
    <!-- 标题 -->
    <span slot="title">商品添加</span>
    <!-- 内容 -->
    <div slot="content">
      <!-- 表单 -->
      <el-form :model="goodsAddForm" size="small" label-width="100px" style="width: 400px;">
        <!-- 商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="goodsAddForm.name"></el-input>
        </el-form-item>

        <!-- 商品分类 -->
        <el-form-item label="商品分类">
          <el-select v-model="goodsAddForm.category">
            <el-option
              v-for="item in categories"
              :key="item.cateName"
              :value="item.cateName"
            >{{item.cateName}}</el-option>
          </el-select>
        </el-form-item>

        <!-- 商品价格 -->
        <el-form-item label="商品价格">
          <el-input-number v-model="goodsAddForm.price" :min="1" :max="10000"></el-input-number>
        </el-form-item>

        <!-- 商品图片 -->
        <el-form-item label="商品图片">
          <!-- 上传组件 -->
          <el-upload
            :show-file-list="false"
            :action="uploadUrl"
            :on-success="handleAvatarSuccess"
            class="avatar-uploader"
          >
            <!-- 图片 -->
            <img v-if="goodsAddForm.imgUrl" :src="imgServeUrl + goodsAddForm.imgUrl" class="avatar" />
            <!-- +字架 -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 商品描述  -->
        <el-form-item label="商品描述">
          <el-input v-model="goodsAddForm.goodsDesc" type="textarea"></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="submitForm" size="small" type="primary">添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Card>
</template>

<script>
// 引入组件
import Card from "@/components/Card";
import { getCateNames, addGoods } from "@/api/goods";

export default {
  // 注册组件
  components: {
    Card,
  },
  data() {
    return {
      uploadUrl: "http://172.16.17.254:5000/goods/goods_img_upload", // 发送ajax请求的地址
      imgServeUrl: "http://172.16.17.254:5000/upload/imgs/goods_img/", // 图片所在的服务器的目录

      // 商品添加表格
      goodsAddForm: {
        name: "",
        category: "",
        price: "",
        imgUrl: "", // 商品图片
        goodsDesc: "",
      },

      // 分类名称
      categories: [],
    };
  },
  methods: {
    // 商品上传成功的回调函数
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({
          type: "success",
          message: msg,
        });

        // 回填图片
        this.goodsAddForm.imgUrl = imgUrl;
      }
    },
    // 添加商品
    async submitForm() {
      let { code } = await addGoods(this.goodsAddForm);
      if (code === 0) this.$router.push("/goods/goods-list");
    },
  },
  async created() {
    let res = await getCateNames();
    this.categories = res.categories; // 渲染分类名称
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