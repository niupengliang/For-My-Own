<template>
  <Card>
    <!-- 标题 -->
    <span slot="title" class="title">
      <span>商品分类</span>
      <el-button size="mini" type="primary">添加分类</el-button>
    </span>
    <!-- 内容 -->
    <div slot="content">
      <!-- 表格 -->
      <el-table size="small" :data="tableData">
        <!-- 序号 -->
        <el-table-column label="序号" type="index" width="120"></el-table-column>

        <!-- 分类名称 -->
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">{{ scope.row.cateName }}</span>
            <el-input v-else size="mini" v-model="scope.row.cateName"></el-input>
          </template>
        </el-table-column>

        <!-- 是否启用 -->
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-switch
              :disabled="!scope.row.isEdit"
              v-model="scope.row.state"
              active-color="#13ce66"
            ></el-switch>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.row)"
              :type="scope.row.isEdit ? 'success' : ''"
              size="mini"
            >{{ scope.row.isEdit ? '完成' : '编辑' }}</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next,jumper"
        :current-page="currentPage"
        background
        :total="total"
        :page-size="pageSize"
      ></el-pagination>
    </div>
  </Card>
</template>

<script>
// 引入组件
import Card from "@/components/Card";
// 引入ajax
import { getCateList, editCate } from "@/api/goods";

export default {
  // 注册组件
  components: {
    Card,
  },
  data() {
    return {
      tableData: [
        // { id: 1, cateName: "热销榜", state: true },
        // { id: 2, cateName: "热销榜", state: false },
      ],
      currentPage: 1, // 当前页
      total: 25, // 总条数
      pageSize: 5, // 每页条数

      // isEdit: false, // 是否可以编辑
    };
  },
  methods: {
    // 封装获取数据的函数
    async fetchData() {
      let { total, data } = await getCateList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });

      // 边界处理【解决删除问题的】
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1;
        this.fetchData();
      }

      // 处理sate
      data.forEach((item) => {
        item.state = item.state == 1 ? true : false;
        item.isEdit = false; // 每条数据都添加一个字段 isEdit 默认是false
      });

      // 赋值渲染
      this.total = total;
      this.tableData = data;
    },

    // 编辑分类
    async handleEdit(row) {
      row.isEdit = !row.isEdit;

      if (!row.isEdit) {
        // 发送修改分类的ajax
        await editCate({
          id: row.id,
          cateName: row.cateName,
          state: row.state,
        });
      }
    },

    // 当前页改变
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData(); // 页码改变 调用1次
    },
  },
  created() {
    this.fetchData(); // 进入页面 调用1次
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.el-pagination {
  margin-top: 30px;
}
</style>