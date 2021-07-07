<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
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
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdate"
          v-hasPermi="['purchase:order:edit']"
        >保存</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-close"
          size="mini"
          @click="handleClose"
        >关闭</el-button>
      </el-col>
    </el-row>

    <el-table height="100%" v-loading="loading" :data="[]" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="单据编号" align="center" prop="keyid" />
      <el-table-column label="配送日期" align="center" prop="fdate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fdate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商代码" align="center" prop="fcode" />
      <el-table-column label="供应商名称" align="center" prop="fname" />
      <el-table-column label="车牌号" align="center" prop="fvehiclenum" />
      <el-table-column label="配送方式" align="center" prop="fdeliverymethod" />
      <el-table-column label="司机" align="center" prop="fdriver" />
      <el-table-column label="押运员" align="center" prop="fsupercargo" />
      <el-table-column label="业务员" align="center" prop="fsalesman" />
      <el-table-column label="备注" align="center" prop="fmemo" />
      <el-table-column label="启用标志" align="center" prop="fflag" />
      <el-table-column label="更新时间" align="center" prop="fupdatedate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fupdatedate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发货人" align="center" prop="fshipper" />
      <el-table-column label="单据状态" align="center" prop="fstatus" />
      <el-table-column label="作业区" align="center" prop="fdistributionpoint" />
    </el-table>

    <!-- 添加或修改采购表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="单据编号" prop="keyid">
          <el-input v-model="form.keyid" placeholder="请输入单据编号" />
        </el-form-item>
        <el-form-item label="配送日期" prop="fdate">
          <el-date-picker clearable size="small"
            v-model="form.fdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择配送日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商代码" prop="fcode">
          <el-select v-model="form.fcode" placeholder="请选择供应商代码" clearable size="small" filterable remote :remote-method="getSupplierListByCode">
            <el-option v-for="(item, index) in supplierListCode" :key="index" :label="item.fcode" :value="item.fcode" />
          </el-select>
        </el-form-item>
        <el-form-item label="供应商名称" prop="fname">
          <el-select v-model="form.fname" placeholder="请选择供应商名称" clearable size="small" filterable remote :remote-method="getSupplierListByName">
          <el-option v-for="(item, index) in supplierListName" :key="index" :label="item.fname" :value="item.fcode" />
          </el-select>
        </el-form-item>
        <el-form-item label="供应商地址" prop="faddress">
          <el-input v-model="form.faddress" placeholder="请输入供应商地址" />
        </el-form-item>
        <el-form-item label="电话" prop="fphone">
          <el-input v-model="form.fphone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="联系人" prop="flinkman">
          <el-input v-model="form.flinkman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="车牌号" prop="fvehiclenum">
          <el-select v-model="form.fvehiclenum" placeholder="请选择车牌号">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="配送方式" prop="fdeliverymethod">
          <el-select v-model="form.fdeliverymethod" placeholder="请选择配送方式">
            <el-option v-for="(item, index) in deliveryDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="司机" prop="fdriver">
          <el-select v-model="form.fdriver" placeholder="请选择司机">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="押运员" prop="fsupercargo">
          <el-select v-model="form.fsupercargo" placeholder="请选择押运员">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="业务员" prop="fsalesman">
          <el-select v-model="form.fsalesman" placeholder="请选择业务员">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="fmemo">
          <el-input v-model="form.fmemo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="运输服务费" prop="ffreight">
          <el-input v-model="form.ffreight" placeholder="请输入运输服务费" />
        </el-form-item>
        <el-form-item label="发货人" prop="fshipper">
          <el-select v-model="form.fshipper" placeholder="请选择发货人">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="区域" prop="farea">
          <el-select v-model="form.farea" placeholder="请选择区域">
            <el-option v-for="(item, index) in areaDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号" prop="flogisticsnumber">
          <el-input v-model="form.flogisticsnumber" placeholder="请输入物流单号" />
        </el-form-item>
        <el-form-item label="业务类型" prop="fcate">
          <el-select v-model="form.fcate" placeholder="请选择业务类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="作业区" prop="fdistributionpoint">
          <el-select v-model="form.fdistributionpoint" placeholder="请选择作业区">
            <el-option v-for="(item, index) in operationDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { getOrder, addOrder, updateOrder } from "@/api/purchase/order";
import { listSupplier } from "@/api/basic/supplier";
import { listItem } from "@/api/system/businessDictItem";
import { listUser } from "@/api/system/user";

export default {
  name: "OrderDetail",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
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
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        keyid: [
          { required: true, message: "单据编号不能为空", trigger: "blur" }
        ],
      },
      supplierListName: [],
      supplierListCode: [],
      billDictList: [], // 单据状态
      deliveryDictList: [], // 配送方式
      areaDictList: [], // 区域
      businessDictList: [], // 业务类型
      operationDictList: [], // 操作区
      keyid: null
    };
  },
  created() {
    this.keyid = this.$route.query.keyid
    if(this.keyid) {
      this.$route.meta.title = this.title = '编辑采购订单'
      this.getOrderDetail(this.keyid)
    }else {
      this.$route.meta.title = this.title = '添加采购订单'
    }
    this.getDictList();
  },
  methods: {
    /** 监听路由发生变化执行函数 */

    /** 查询采购订单详情 */
    getOrderDetail(keyid) {
      getOrder(keyid).then(response => {
        this.loading = false
      })
    },
    /** 查询字典，初始化页面数据 */
    getDictList() {
      // 获取单据状态
      listItem({
        pageNum: 1,
        pageSize: 20,
        fsparent: 1007
      }).then(response => {
        this.billDictList = response.rows
        // this.getList() // 先获取单据状态，根据单据状态渲染列表
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
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        keyid: null,
        fcompanyid: null,
        createby: null,
        fdate: null,
        fcode: null,
        fname: null,
        faddress: null,
        fphone: null,
        flinkman: null,
        fvehiclenum: null,
        fdeliverymethod: null,
        fdriver: null,
        fsupercargo: null,
        fsalesman: null,
        fmemo: null,
        fflag: null,
        fupdateby: null,
        fupdatedate: null,
        ftype: null,
        ffreight: null,
        famount: null,
        fshipper: null,
        fprogress: null,
        fstatus: null,
        fauditor: null,
        fauditflag: null,
        farea: null,
        flogisticsnumber: null,
        fdeleteflag: null,
        fcate: null,
        fdispatchnum: null,
        foutflag: null,
        fdistributionpoint: null,
        forgid: null,
        forgname: null,
        fbill: null,
        fpoint: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      // this.getList();
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
      this.reset();
      const keyid = row.keyid || this.ids
      getOrder(keyid).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改采购";
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$store.dispatch('tagsView/addView', this.$route)
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
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.keyid != null) {
            updateOrder(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              // this.getList();
            });
          } else {
            addOrder(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              // this.getList();
            });
          }
        }
      });
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
          // this.getList();
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
  },
  watch: {
    $route: {
      handler: function(val){
        if(val.path != '/purchase/order/detail') return
        this.keyid = this.$route.query.keyid
        if(this.keyid) {
          this.$route.meta.title = this.title = '编辑采购订单'
          this.getOrderDetail(this.keyid);
        }else {
          this.$route.meta.title = this.title = '添加采购订单'
        }
        const visitedViews = this.$store.state.tagsView.visitedViews
        for(let item of visitedViews) {
          if(item.path == this.$route.path) {
            item.title = this.title
          }
        }
      }
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
</style>