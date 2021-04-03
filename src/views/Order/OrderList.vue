<template>
  <Card>
    <span slot="title">订单列表</span>

    <div slot="content">
      <!-- 使用自己封装的组件 -->
      <!-- <wei-button @click="handleClick">添加订单</wei-button>
      <wei-button type="danger" size="small">取消订单</wei-button>
      <wei-button type="primary" size="mini">阿威按钮</wei-button>-->

      <!-- 查询表单 -->
      <el-form :model="searchForm" style="margin-bottom: 30px;" size="small" :inline="true">
        <!-- 订单号 -->
        <el-form-item label="订单号">
          <el-input v-model="searchForm.orderNo"></el-input>
        </el-form-item>

        <!-- 收货人 -->
        <el-form-item label="收货人">
          <el-input v-model="searchForm.consignee"></el-input>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phone"></el-input>
        </el-form-item>

        <!-- 订单状态 -->
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.orderState" style="width: 140px;">
            <el-option value="已受理">已受理</el-option>
            <el-option value="派送中">派送中</el-option>
            <el-option value="已完成">已完成</el-option>
          </el-select>
        </el-form-item>

        <!-- 下单时间 -->
        <el-form-item label="下单时间">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="searchForm.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="search" type="primary" size="mini">查询</el-button>
          <el-button @click="reset" type="success" size="mini">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 订单表格 -->
      <el-table :data="tableData" border :style="styleObj">
        <!-- 订单号 -->
        <el-table-column fixed prop="orderNo" label="订单号" width="120"></el-table-column>

        <!-- 下单时间 -->
        <el-table-column prop="orderTime" label="下单时间" width="180"></el-table-column>

        <!-- 手机号 -->
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>

        <!-- 收货人 -->
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>

        <!-- 配送地址 -->
        <el-table-column prop="deliverAddress" label="配送地址" width="120"></el-table-column>

        <!-- 送达时间 -->
        <el-table-column prop="deliveryTime" label="送达时间" width="180"></el-table-column>

        <!-- 用户备注 -->
        <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>

        <!-- 订单金额 -->
        <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>

        <!-- 订单状态 -->
        <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>

        <!-- 操作 -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="rowData">
            <el-button @click="handleDetail(rowData.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleEdit(rowData.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        style="margin-top: 30px;"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next,jumper"
        :current-page="currentPage"
        background
        :total="total"
        :page-size="pageSize"
      ></el-pagination>

      <!-- 模态框 -->
      <wei-dialog @handle-close="closeDialog" :visible="dialogVisible" title="订单详情111">
        <!-- 这段内容插入匿名插槽 -->
        <div>{{ orderDetail }}</div>

        <!-- 插入具名插槽 -->
        <span slot="footer">
          <wei-button @click="closeDialog" type="primary" size="small">取消</wei-button>
          <!-- <wei-button type="danger" size="small">确定</wei-button> -->
        </span>
      </wei-dialog>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import { getOrderList } from "@/api/order";
import moment from "moment";
import local from "@/utils/local";
import WeiButton from "@/components/WeiButton/WeiButton.vue";
import WeiDialog from "@/components/WeiDialog";

export default {
  components: {
    Card,
    WeiButton,
    WeiDialog,
  },
  data() {
    return {
      // 查询表单
      searchForm: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: [],
      },
      // 表格
      tableData: [],

      orderDetail: {}, // 详情定向

      // 样式
      styleObj: { width: document.body.offsetWidth - 300 + "px" },

      // 表格数据
      tableData: [],
      total: 0, // 总数据条数
      pageSize: 5, // 每页条数
      currentPage: 1, // 当前页

      dialogVisible: false, // 模态框的显示和隐藏
    };
  },
  methods: {
    // 测试事件
    handleClick() {
      console.log("我是阿威");
    },

    // 封装一个获取数据的函数
    async fetchData() {
      let { total, data } = await getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,

        // 查询参数
        orderNo: this.searchForm.orderNo,
        consignee: this.searchForm.consignee,
        phone: this.searchForm.phone,
        orderState: this.searchForm.orderState,
        date:
          this.searchForm.date == null
            ? JSON.stringify([])
            : JSON.stringify(this.searchForm.date),
      });

      // 处理时间格式
      data.forEach((item) => {
        item.orderTime = moment(item.orderTime).format("YYYY-MM-DD HH:mm:ss");
        item.deliveryTime = moment(item.deliveryTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });

      // 赋值渲染
      this.total = total;
      this.tableData = data;
    },

    // 回调 resize
    callback() {
      this.styleObj.width = document.body.offsetWidth - 300 + "px";
      console.log(document.body.offsetWidth);
    },

    // 查询
    search() {
      this.currentPage = 1; // 页码重置为1
      this.fetchData(); // 再次获取数据
    },
    // 重置
    reset() {
      // 表单回到默认值
      this.searchForm = {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: [],
      };
      this.search();
    },
    // 当前页改变
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData(); // 调用2次
    },
    // 订单编辑
    handleEdit(row) {
      // 1. 本地存储
      // local.set("row", row);
      this.$router.push("/order/order-edit"); // 跳转到订单列表
      // console.log(row);
      // 2. query方式
      // this.$router.push({
      //   path: "/order/order-edit", // 要跳转的路径
      //   // 把id传递出去
      //   query: {
      //     id: row.id,
      //   },
      // });
      // 3. params方式
      // this.$router.push({
      //   name: "orderEdit", // 路由的名字跳转
      //   // 把参数传递过去
      //   params: {
      //     row,
      //   },
      // });
    },

    // 查看详情
    handleDetail(row) {
      this.orderDetail = row;
      this.dialogVisible = true;
    },

    // 关闭模态框
    closeDialog() {
      this.dialogVisible = false;
    },
  },
  created() {
    this.fetchData(); // 调用1次

    window.addEventListener("resize", this.callback);
  },
  destroyed() {
    // 销毁时间
    window.removeEventListener("resize", this.callback);
  },
};
</script>

<style lang="less" scoped>
</style>