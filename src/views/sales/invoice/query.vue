<template>
  <div class="app-container">
    <div class="d-flex">
      <div class="container-left">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
          <el-form-item label="开始日期" prop="begindate">
            <el-date-picker clearable
              v-model="queryParams.begindate"
              type="date"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期" prop="enddate">
            <el-date-picker clearable
              v-model="queryParams.enddate"
              type="date"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单号" prop="keyid">
            <el-input
              v-model="queryParams.keyid"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item> 
          <el-form-item label="客户代码" prop="fcode">
            <el-input
              v-model="queryParams.fcode"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="客户名称" prop="fname">
            <el-input
              v-model="queryParams.fname"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="商品代码" prop="itemcode">
            <el-input
              v-model="queryParams.itemcode"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="商品名称" prop="itemname">
            <el-input
              v-model="queryParams.itemname"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="container-right">
        <el-row :gutter="10" class="mb8 mrt-5">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
            >查询</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-refresh"
              size="mini"
              @click="resetQuery"
            >重置条件</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              :loading="exportLoading"
              @click="handleExport"
            >导出</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              plain
              icon="el-icon-close"
              size="mini"
              @click="handleClose"
            >关闭</el-button>
          </el-col>
        </el-row>
        <el-table height="100%" v-loading="loading" :data="orderList" class="table" resizable border>
          <!-- <el-table-column type="selection" align="center" /> -->
          <el-table-column label="日期" align="center" prop="fdate" />
          <el-table-column label="作业区" align="center" prop="fdistributionpoint" />
          <el-table-column label="订单类型" align="center" prop="ft6billstatus" />
          <el-table-column label="订单号" align="center" prop="keyid" />
          <el-table-column label="客户代码" align="center" prop="fcode" />
          <el-table-column label="客户名称" align="center" prop="fname" />
          <el-table-column label="商品名称" align="center" prop="fitemname" />
          <el-table-column label="数量" align="center" prop="fqty" />
          <el-table-column label="包装物编码" align="center" prop="fbottle" />
          <el-table-column label="包装物" align="center" prop="fbottlename" />
          <el-table-column label="实瓶数量" align="center" prop="fbottleqty" />
          <el-table-column label="备注" align="center" prop="fmemo" />
          <el-table-column label="商品代码T6" align="center" prop="finum" />
          <el-table-column label="商品代码" align="center" prop="fitemcode" />
          <el-table-column label="所属区域" align="center" prop="farea" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { listOut } from "@/api/sales/out";

export default {
  name: "InvoiceQuery",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 销售订单表格数据
      orderList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        fcode: null,
        fname: null,
        keyid: null,
        begindate: null,
        enddate: null,
        itemcode: null,
        itemname: null
      }
    };
  },
  created() {
    let date = new Date()
    let [y, m, d] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    m = m < 10 ? "0" + m : m;
	  d = d < 10 ? "0" + d : d;
    this.queryParams.begindate = this.queryParams.enddate = y + '-' + m + '-' + d
    this.getList()
  },
  methods: {
    /** 查询销售订单列表 */
    getList() {
      this.loading = true;
      console.log(JSON.stringify(this.queryParams))
      listOut(this.queryParams).then(response => {
        // console.log(response)
        this.orderList = response.rows;
        // for (const key in this.orderList) {
        //   if (Object.hasOwnProperty.call(this.orderList, key)) {
        //     const element = this.orderList[key];
        //     if(element.fflag == 1) {
        //       element.fflag = '启用'
        //     }else {
        //       element.fflag = '未启用'
        //     }
        //   }
        // }
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有供应商数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportSupplier(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    },
    /** 关闭按钮操作 */
    handleClose() {
      this.$store.dispatch('tagsView/delView', this.$route).then(({ visitedViews }) => {
        this.toLastView(visitedViews, this.$route)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        if (view.name === 'Dashboard') {
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
  }
};
</script>
<style scoped>
  .app-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 5px;
  }
  .mrt-5 {
    margin-left: 5px !important;
    margin-right: 5px !important;
  }
  .d-flex {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: auto;
  }
  .d-none {
    display: none;
  }
  ul {
    margin: 0;
    padding: 5px;
    list-style: none;
  }
  .container-left {
    width: 200px;
    overflow: scroll !important;
    border: #ccc 1px solid;
    padding: 5px;
  }
  .el-form--inline .el-form-item {
    display: grid;
    margin-right: 0;
    vertical-align: top;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
  .container-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  .table {
    flex: 1;
  }
  .el-icon-document {
    display: inline-flex
  }
  .activeStyle {
    color: #1d8cff;
  }
  .collapse, .collapse >>> .el-collapse-item__header, .collapse >>> .el-collapse-item__wrap {
    border: none !important;
  }
  .collapse >>> .el-collapse-item__header {
    padding-left: 5px;
    font-size: 16px;
  }
  .activeStyle >>> .el-collapse-item__header {
    color: #1d8cff;
  }
  .collapse-item >>> .el-collapse-item__wrap {
    overflow: unset;
  }
</style>