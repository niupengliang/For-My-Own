<template>
  <Card>
    <span class="title" slot="title">
      <span>店铺管理</span>
      <el-button
        @click="save"
        :type="isEdit ? 'success':'primary'"
        size="mini"
      >{{ isEdit ? '保存' : '编辑' }}</el-button>
    </span>
    <div slot="content">
      <!-- 内容 -->
      <el-form
        :disabled="!isEdit"
        :model="shopForm"
        style="width: 600px;"
        size="small"
        label-width="100px"
      >
        <!-- 店铺名称 -->
        <el-form-item label="店铺名称">
          <el-input v-model="shopForm.name"></el-input>
        </el-form-item>

        <!-- 店铺公告 -->
        <el-form-item label="店铺公告">
          <el-input v-model="shopForm.bulletin" type="textarea"></el-input>
        </el-form-item>

        <!-- 店铺头像 -->
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="shopForm.avatar" :src="imgServeUrl + shopForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 店铺图片 -->
        <el-form-item label="店铺图片">
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :file-list="shopForm.pics"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handlePicSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <!-- 预览的模态框 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <!-- 配送费 -->
        <el-form-item label="配送费">
          <el-input v-model="shopForm.deliveryPrice"></el-input>
        </el-form-item>

        <!-- 配送时间 -->
        <el-form-item label="配送时间">
          <el-input v-model="shopForm.deliveryTime"></el-input>
        </el-form-item>

        <!-- 配送描述 -->
        <el-form-item label="配送描述">
          <el-input v-model="shopForm.description"></el-input>
        </el-form-item>

        <!-- 店铺评分 -->
        <el-form-item label="店铺评分">
          <el-input v-model="shopForm.score"></el-input>
        </el-form-item>

        <!-- 销量 -->
        <el-form-item label="销量">
          <el-input v-model="shopForm.sellCount"></el-input>
        </el-form-item>

        <!-- 活动 -->
        <el-form-item label="活动">
          <el-checkbox-group v-model="shopForm.supports">
            <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
            <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 营业时间 -->
        <el-form-item label="营业时间">
          <el-time-picker
            v-model="shopForm.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
      </el-form>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import { getShopInfo, editShop } from "@/api/shop";
import { isDate } from "moment";

export default {
  components: {
    Card,
  },
  data() {
    return {
      shopForm: {
        name: "",
        bulletin: "",

        // 图片
        avatar: "",
        pics: [],

        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        supports: "",
        date: [],
      },
      uploadUrl: "http://172.16.17.254:5000/shop/upload", // 上传ajax请求发送的地址
      imgServeUrl: "http://172.16.17.254:5000/upload/shop/", // 图片所在的服务器文件夹的目录
      dialogVisible: false, // 图片预览模态框
      dialogImageUrl: "", // 模态框图片地址

      isEdit: false,

      // 图片列表
      // fileList: [
      // {
      //   url:
      //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      // },
      // {
      //   url:
      //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      // },
      // ],
    };
  },

  methods: {
    // 上传成功回调函数
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({
          type: "success",
          message: msg,
        });
        // 头像回填
        this.shopForm.avatar = imgUrl;
      }
    },

    // 店铺图片上传成功
    handlePicSuccess(res) {
      this.shopForm.pics.push({ url: this.imgServeUrl + res.imgUrl });
    },

    // 删除
    handleRemove(file) {
      // 从数组中找到要删除的那一项 删除
      this.shopForm.pics.forEach((item, index) => {
        if (item.url === file.url) {
          this.shopForm.pics.splice(index, 1);
        }
      });
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },

    // 保存
    async save() {
      this.isEdit = !this.isEdit;

      if (!this.isEdit) {
        // 处理图片
        let arr = this.shopForm.pics.map((pic) => {
          return pic.url.substr(this.imgServeUrl.length);
        });

        // 数组格式处理：变成字符串格式的数组
        // this.shopForm.date = JSON.stringify(this.shopForm.date);
        // this.shopForm.pics = JSON.stringify(this.shopForm.pics);
        // this.shopForm.supports = JSON.stringify(this.shopForm.supports);

        let data = {
          id: this.shopForm.id,
          name: this.shopForm.name,
          bulletin: this.shopForm.bulletin,
          avatar: this.shopForm.avatar,
          deliveryPrice: this.shopForm.deliveryPrice,
          deliveryTime: this.shopForm.deliveryTime,
          description: this.shopForm.description,
          score: this.shopForm.score,
          sellCount: this.shopForm.sellCount,
          supports: JSON.stringify(this.shopForm.supports),
          pics: JSON.stringify(arr),
          date: JSON.stringify(this.shopForm.date),
        };

        console.log(data);

        await editShop(data); // 发送修改请求
      }
    },
  },

  async created() {
    let { data } = await getShopInfo();

    // 处理图片的格式 成为我要要渲染的格式
    data.pics = data.pics.map((pic) => {
      return {
        url: this.imgServeUrl + pic,
      };
    });

    // 赋值渲染
    this.shopForm = data;
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
/deep/.avatar-uploader .el-upload {
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