<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" class="search-form">
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
        <el-select v-model="queryParams.fcode" placeholder="请选择客户代码" clearable size="small" filterable remote :remote-method="getSupplierListByCode">
          <el-option v-for="(item, index) in supplierListCode" :key="index" :label="item.fcode" :value="item.fcode" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称" prop="fname">
        <el-select v-model="queryParams.fname" placeholder="请选择客户名称" clearable size="small" filterable remote :remote-method="getSupplierListByName">
          <el-option v-for="(item, index) in supplierListName" :key="index" :label="item.fname" :value="item.fcode" />
        </el-select>
      </el-form-item>
      <el-form-item label="业务员" prop="fsalesman">
        <el-select v-model="queryParams.fsalesman" placeholder="请选择业务员" size="small">
          <el-option v-for="(item, index) in fsalesmanList" :key="index" :label="item.fkey" :value="item.fvalue" />
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
          v-hasPermi="['sales:reviewInvoice:add']"
        >查询</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['sales:reviewInvoice:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-upload"
          size="mini"
          @click="handleUpload"
          v-hasPermi="['sales:reviewInvoice:upload']"
        >上传</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-close"
          size="mini"
          @click="handleClose"
        >关闭</el-button>
      </el-col>
    </el-row>

    <el-table height="100%" v-loading="loading" :data="outList" @selection-change="handleSelectionChange" border resizable>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="发货单号" align="center" prop="keyid">
        <template v-slot="scope">
          <el-link type="primary" @click="handleUpdate(scope.row)">{{scope.row.keyid}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center" prop="fdeleteflag" />
      <el-table-column label="作废标识" align="center" prop="fdeleteflag" />
      <el-table-column label="单据状态" align="center" prop="fstatus" />
      <el-table-column label="上传" align="center" prop="ft6status" />
      <el-table-column label="作业区" align="center" prop="fdistributionpoint" />
      <el-table-column label="配送日期" align="center" prop="fdate" />
      <el-table-column label="客户名称" align="center" prop="fname" />
      <el-table-column label="业务员" align="center" prop="fsalesman" />
      <el-table-column label="配送方式" align="center" prop="fdeliverymethod" />
      <el-table-column label="车牌号" align="center" prop="fvehiclenum" />
      <el-table-column label="送货司机" align="center" prop="fdriver" />
      <el-table-column label="押运员" align="center" prop="fsupercargo" />
      <el-table-column label="发货人" align="center" prop="fshipper" />
      <el-table-column label="操作员" align="center" prop="createby" />
      <el-table-column label="备注" align="center" prop="fmemo" />
      <el-table-column label="关联空瓶回收" align="center" prop="fbottleincode" />
      <el-table-column label="T6开票状态" align="center" prop="fbottleoutcode" />
      <el-table-column label="T6收款状态" align="center" prop="fbottleoutcode" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listOut, getOut, delOut, addOut, updateOut, exportOut } from "@/api/sales/out";
import { listSupplier } from "@/api/basic/supplier";
import { listItem } from "@/api/system/businessDictItem";

export default {
  name: "T6Upload",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: false,
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
      // 出仓单表格数据
      outList: [],
      // 弹出层标题
      title: "",
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        keyid: null,
        fcode: null,
        fname: null,
        fsalesman: null,
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
      fsalesmanList: [], // 业务员
      billDictList: [], // 单据状态
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDictList();
  },
  methods: {
    /** 查询发货单列表 */
    getList() {
      this.loading = true;
      listOut(this.queryParams).then(response => {
        this.outList = response.rows;
        for (let i = 0; i < this.outList.length; i++) {
          const element = this.outList[i];
          if(element.fflag == 0) {
            element.fdeleteflag = "未启用"
          }else{
            element.fdeleteflag = "已启用"
          }
          for (let j = 0; j < this.billDictList.length; j++) {
            const element1 = this.billDictList[j];
            if(element.fstatus == element1.fvalue) {
              element.fstatus = element1.fkey
            }
          }
        }
        this.total = response.total;
        this.loading = false;
      });
    },
    getDictList() {
      // 获取单据状态
      listItem({
        pageNum: 1,
        pageSize: 20,
        fsparent: 1007
      }).then(response => {
        this.billDictList = response.rows
        this.getList() // 先获取单据状态，根据单据状态渲染列表
      })
      // 获取作业区
      listItem({
        pageNum: 1,
        pageSize: 20,
        fsparent: 1026
      }).then(response => {
        this.fsalesmanList = response.rows
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
        name: "InvoiceDetail",
        path: "/sales/invoice/detail",
        query: {
          keyid: keyid
        }
      }
      Object.assign(route, {
        meta: { title: '编辑发货单' }
      })
      this.$store.dispatch('tagsView/addView', route).then(this.$router.push(route))
    },
    /** 新增按钮操作 */
    handleAdd() {
      const route = {
        name: "InvoiceDetail",
        path: "/sales/invoice/detail",
      }
      Object.assign(route, {
        meta: { title: '添加发货单' }
      })
      this.$store.dispatch('tagsView/addView', route).then(this.$router.push(route))
    },
    /** 上传按钮操作 */
    handleUpload(row) {
      const keyid = row.keyid || this.ids
      // 上传操作
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
  .nosend >>> .el-form-item__label {
    width: 150px !important;
  }
  .el-form >>> .el-form-item__content {
    margin-left: 100px !important;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  .search-form >>> .el-form-item__content{
    margin-left: 10px !important;
  }
</style>