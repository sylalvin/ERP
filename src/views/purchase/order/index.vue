<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" class="search-form">
      <el-form-item label="开始日期"  prop="beginDate">
          <el-date-picker clearable size="small"
            v-model="queryParams.beginDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期" prop="endDate">
          <el-date-picker clearable size="small"
            v-model="queryParams.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="单据编号" prop="keyid">
        <el-input
          v-model="queryParams.keyid"
          placeholder="请输入单据编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户代码" prop="fcode">
        <el-select v-model="queryParams.fcode" placeholder="请选择供应商代码" clearable size="small" filterable remote :remote-method="getSupplierListByCode">
          <el-option v-for="(item, index) in supplierListCode" :key="index" :label="item.fcode" :value="item.fcode" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称" prop="fname">
        <el-select v-model="queryParams.fname" placeholder="请选择供应商名称" clearable size="small" filterable remote :remote-method="getSupplierListByName">
          <el-option v-for="(item, index) in supplierListName" :key="index" :label="item.fname" :value="item.fcode" />
        </el-select>
      </el-form-item>
      <el-form-item label="业务状态" prop="fstatus">
        <el-select v-model="queryParams.fstatus" placeholder="请选择业务状态" size="small">
          <el-option v-for="(item, index) in fstatusList" :key="index" :label="item.fkey" :value="item.fvalue" />
        </el-select>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
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
        >重置</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['purchase:order:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['purchase:order:edit']"
        >编辑</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['purchase:order:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-download"
          size="mini"
		  :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['purchase:order:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-close"
          size="mini"
          @click="handleClose"
        >关闭</el-button>
      </el-col>
    </el-row>

    <el-table height="100%" v-loading="loading" :data="orderList" @selection-change="handleSelectionChange" border resizable>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="单据编号" align="center" prop="keyid">
        <template v-slot="scope">
          <el-link type="primary" @click="handleUpdate(scope.row)">{{scope.row.keyid}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="作废标识" align="center" prop="fflag" />
      <el-table-column label="单据状态" align="center" prop="fstatus" />
      <el-table-column label="作业区" align="center" prop="fdistributionpoint" />
      <el-table-column label="配送日期" align="center" prop="fdate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fdate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户代码" align="center" prop="fcode" />
      <el-table-column label="客户名称" align="center" prop="fname" />
      <el-table-column label="配送方式" align="center" prop="fdeliverymethod" />
      <el-table-column label="车牌号" align="center" prop="fvehiclenum" />
      <el-table-column label="送货司机" align="center" prop="fdriver" />
      <el-table-column label="押运员" align="center" prop="fsupercargo" />
      <el-table-column label="发货人" align="center" prop="fshipper" />
      <el-table-column label="操作员" align="center" prop="createby" />
      <el-table-column label="操作时间" align="center" prop="fupdatedate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fupdatedate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[50, 100, 300, 500]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listOrder, delOrder, addOrder, updateOrder, exportOrder } from "@/api/purchase/order";
import { listSupplier } from "@/api/basic/supplier";
import { listItem } from "@/api/system/businessDictItem";
import { listUser } from "@/api/system/user";

export default {
  name: "Order",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 采购表格数据
      orderList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 50,
        keyid: null,
        fcode: null,
        fname: null,
        fstatus: null,
        beginDate: null,
        endDate: null
      },
      supplierListNameParams: { // 通过Name查询供应商参数
        pageNum: 1,
        pageSize: 20,
        fname: null
      },
      supplierListCodeParams: { // 通过Code查询供应商参数
        pageNum: 1,
        pageSize: 20,
        fcode: null
      },
      supplierListName: [],
      supplierListCode: [],
      fstatusList: [], // 单据状态
      deliveryDictList: [], // 配送方式
      areaDictList: [], // 区域
      businessDictList: [], // 业务类型
      operationDictList: [] // 操作区
    };
  },
  created() {
    let date = new Date()
    let [y, m, d] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    m = m < 10 ? "0" + m : m;
	  d = d < 10 ? "0" + d : d;
    this.queryParams.beginDate = this.queryParams.endDate = y + '-' + m + '-' + d
    this.getDictList();
  },
  methods: {
    /** 查询采购列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        this.orderList = response.rows;
        console.log(JSON.stringify(this.orderList[0]))
        for (let i = 0; i < this.orderList.length; i++) {
          const element = this.orderList[i];
          if(element.fflag == 0) {
            element.fflag = "已作废"
          }else{
            element.fflag = "启用"
          }
          for (let j = 0; j < this.fstatusList.length; j++) {
            const element1 = this.fstatusList[j];
            if(element.fstatus == element1.fvalue) {
              element.fstatus = element1.fkey
            }
          }
        }
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询字典，初始化页面数据 */
    getDictList() {
      // 获取单据状态
      listItem({
        pageNum: 1,
        pageSize: 20,
        fsparent: 1007
      }).then(response => {
        this.fstatusList = response.rows
        this.getList() // 先获取业务状态，根据业务状态渲染列表
      })
      // 获取配送方式
      listItem({
        pageNum: 1,
        pageSize: 20,
        fsparent: 1009
      }).then(response => {
        this.deliveryDictList = response.rows
      })
      // 获取区域
      listItem({
        pageNum: 1,
        pageSize: 20,
        fsparent: 1004
      }).then(response => {
        this.areaDictList = response.rows
      })
      // // 获取业务类型
      // listItem({
      //   pageNum: 1,
      //   pageSize: 20,
      //   fsparent: 1007
      // }).then(response => {
      // this.businessDictList = response.rows
      // })
      // 获取作业区
      listItem({
        pageNum: 1,
        pageSize: 20,
        fsparent: 1026
      }).then(response => {
        this.operationDictList = response.rows
      })
      listUser({
        pageNum: 1,
        pageSize: 20
      }).then(response => {
        // console.log(JSON.stringify(response.rows))
      })
    },
    getSupplierListByName(query) { // 通过name得模糊查询
      if(query=='') {
        this.supplierListName = []
        return
      }
      this.supplierListNameParams.fname = query
      listSupplier(this.supplierListNameParams).then(response => {
        this.supplierListName = response.rows;
      });
    },
    getSupplierListByCode(query) { // 通过code得模糊查询
      if(query=='') {
        this.supplierListCode = []
        return
      }
      this.supplierListCodeParams.fcode = query
      listSupplier(this.supplierListCodeParams).then(response => {
        this.supplierListCode = response.rows;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.keyid)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      const keyid = row.keyid || this.ids
      const route = {
        name: "OrderDetail",
        path: "/purchase/order/detail",
        query: {
          keyid: keyid
        }
      }
      Object.assign(route, {
        meta: { title: '编辑采购订单' }
      })
      this.$store.dispatch('tagsView/addView', route).then(this.$router.push(route))
    },
    /** 新增按钮操作 */
    handleAdd() {
      const route = {
        name: "OrderDetail",
        path: "/purchase/order/detail"
      }
      Object.assign(route, {
        meta: { title: '添加采购订单' }
      })
      this.$store.dispatch('tagsView/addView', route).then(this.$router.push(route))
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
    /** 删除按钮操作 */
    handleDelete(row) {
      const keyids = row.keyid || this.ids;
      this.$confirm('是否确认删除采购编号为"' + keyids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOrder(keyids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有采购数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
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
  }
  .el-form >>> .el-form-item__label {
    width: 100px !important;
  }
  .el-form >>> .el-form-item__content {
    margin-left: 100px !important;
  }
  .search-form >>> .el-form-item__content{
    margin-left: 10px !important;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
</style>