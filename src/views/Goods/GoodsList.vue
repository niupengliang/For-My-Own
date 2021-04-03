<template>
  <Card>
    <!-- 标题 -->
    <span slot="title">商品列表</span>
    <!-- 内容 -->
    <div slot="content">
      <el-table :data="tableData" style="width: 100%">
        <!-- 商品名称： 可以展开和收起来 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <!-- 商品ID -->
              <el-form-item label="商品ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>

              <!-- 商品名称 -->
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>

              <!-- 所属分类 -->
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>

              <!-- 商品价格 -->
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>

              <!-- 商品图片 -->
              <el-form-item label="商品图片">
                <span>
                  <img width="50" height="50" :src="imgServeUrl + props.row.imgUrl" alt />
                </span>
              </el-form-item>

              <!-- 创建时间 -->
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>

              <!-- 商品评价 -->
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>

              <!-- 商品销量 -->
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>

              <!-- 商品描述 -->
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <!-- 商品名称 -->
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <!-- 所属分类 -->
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <!-- 商品价格 -->
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <!-- 商品图片 -->
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img width="50" height="50" :src="imgServeUrl + scope.row.imgUrl" alt />
          </template>
        </el-table-column>
        <!-- 商品描述 -->
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button v-if="role === 'super'" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next,jumper"
        :current-page="currentPage"
        background
        :page-sizes="[1,3,5,10,20]"
        :total="total"
        :page-size="pageSize"
      ></el-pagination>
    </div>
  </Card>
</template>

<script>
// 引入组件
import Card from "@/components/Card";
import local from "@/utils/local";

export default {
  // 注册组件
  components: {
    Card,
  },
  data() {
    return {
      total: 25, // 总数据条数
      pageSize: 5, // 每页条数
      currentPage: 1, // 当前页
      role: "",

      imgServeUrl: "http://172.16.17.254:5000/upload/imgs/goods_img/", // 图片所在的服务器的目录

      // 商品表格
      tableData: [
        {
          id: 46,
          ctime: "2020-05-06T13:45:31.000Z",
          name: "aa",
          category: "热销榜",
          price: 11,
          imgUrl: "1589865635533.jpg",
          goodsDesc: "不错的商品",
          rating: 100,
          sellCount: 288,
        },
        {
          id: 41,
          ctime: "2020-05-02T10:35:39.000Z",
          name: "田园蔬菜粥",
          category: "特色粥品",
          price: 16,
          imgUrl: "1590130366949.jpg",
          goodsDesc: "一碗皮蛋瘦肉粥，总是",
          rating: 100,
          sellCount: 288,
        },
      ],
    };
  },
  methods: {
    // 当前页码改变
    handleCurrentChange(page) {},
    // 每页条数改变
    handleSizeChange(size) {},
  },
  created() {
    this.role = local.get("role");
    console.log(this.role);
  },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-pagination {
  margin-top: 30px;
}
</style>