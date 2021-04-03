<template>
  <Card>
    <!-- 标题 -->
    <span slot="title">账号列表</span>

    <!-- 内容 -->
    <div slot="content">
      <!-- 表格 -->
      <el-table
        @selection-change="handleSelectionChange"
        ref="accTable"
        size="small"
        :data="tableData"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号" prop="account" width="120"></el-table-column>
        <el-table-column label="用户组" prop="userGroup" width="150"></el-table-column>

        <!-- 列的插槽写法 -->
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ scope.row.ctime }}</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" size="mini" type="primary">编辑</el-button>
            <el-button @click="handleDel(scope.row.id)" size="mini" type="danger">删除</el-button>
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

      <!-- 批量删除 & 取消选择 -->
      <el-button @click="handleBatchDel" type="danger" size="small">批量删除</el-button>
      <el-button @click="cancelSelect" type="primary" size="small">取消选择</el-button>

      <!-- 编辑模态框 -->
      <el-dialog title="编辑账号" :visible.sync="dialogVisible" width="360px">
        <!-- 表格 -->
        <el-form :model="editForm" size="small" label-width="60px">
          <el-form-item label="账号">
            <el-input v-model="editForm.account" style="width: 215px;"></el-input>
          </el-form-item>

          <el-form-item label="用户组">
            <el-select v-model="editForm.userGroup">
              <el-option value="普通管理员">普通管理员</el-option>
              <el-option value="超级管理员">超级管理员</el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleEditAcc">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </Card>
</template>

<script>
// 引入组件
import Card from "@/components/Card";

// 引入ajax函数
import { getAccList, delAcc, batchDel, editAcc } from "@/api/account";

// 引入moment
import moment from "moment";

export default {
  components: {
    Card,
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      total: 0, // 总数据条数
      pageSize: 5, // 每页条数
      currentPage: 1, // 当前页
      dialogVisible: false, // 编辑模态框显示或隐藏
      // 编辑模态框
      editForm: {},
    };
  },
  methods: {
    // 获取数据
    async fetchData() {
      // 发送请求 获取账号列表
      let res = await getAccList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });

      // 解构数据
      let { total, data } = res;

      // 处理时间格式
      data.forEach((item) => {
        item.ctime = moment(item.ctime).format("YYYY-MM-DD HH:mm:ss");
      });

      // 边界判断
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1;
        this.fetchData();
      }

      // 赋值渲染
      this.total = total;
      this.tableData = data;
    },
    // 当前页码改变
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData(); // 2. 当前页改变 调用1次
    },
    // 每页条数改变
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData(); // 3. 每页条数改变 调用1次
    },
    // 删除账号
    handleDel(id) {
      // 优化删除体验 有点仓促
      this.$confirm("删除很危险哦,是否确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 如果用户点击的是确定 就走then
          // 真正的删除ajax 应该在此处写
          let { code } = await delAcc({ id });
          if (code === 0) {
            this.fetchData(); // 刷新
          }
        })
        .catch(() => {
          // 如果用户点击的是取消 就走catch
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 取消选择
    cancelSelect() {
      this.$refs.accTable.clearSelection();
    },
    // 表格选项发生改变
    handleSelectionChange(rows) {
      this.ids = rows.map((item) => item.id); // 把要批量删除的id们 收集起来
    },
    // 批量删除
    handleBatchDel() {
      // 如果用户不选择
      if (!this.ids) {
        this.$message.error("大哥，选择以后再操作哦~~");
        return;
      }

      // 优化
      this.$confirm("批量删除很危险哦,是否确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { code } = await batchDel({ ids: JSON.stringify(this.ids) });
          if (code === 0) {
            this.fetchData(); // 刷新
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑回填
    handleEdit(row) {
      this.dialogVisible = true; // 显示模态框
      let { id, account, userGroup } = row; // 把要的字段取出
      this.editForm = { id, account, userGroup }; // 回填
    },
    // 修改账号
    async handleEditAcc() {
      let { code } = await editAcc(this.editForm);
      if (code === 0) {
        this.dialogVisible = false;
        this.fetchData(); // 刷新
      }
    },
  },
  created() {
    this.fetchData(); // 1. 进入页面 调用1次
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>