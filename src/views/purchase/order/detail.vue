<template>
  <div class="app-container">
    <div class="top-form">
      <!-- 添加或修改采购表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="单据编号" prop="keyid">
          <el-input v-model="form.keyid" disabled />
        </el-form-item>
        <el-form-item label="配送日期" prop="fdate">
          <el-date-picker clearable
            v-model="form.fdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择配送日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商代码" prop="fcode">
          <el-select v-model="form.fcode" placeholder="请选择供应商代码" clearable filterable remote :remote-method="getSupplierListByCode">
            <el-option v-for="(item, index) in supplierListCode" :key="index" :label="item.fcode" :value="item.fcode" />
          </el-select>
        </el-form-item>
        <el-form-item label="供应商名称" prop="fname">
          <el-select v-model="form.fname" placeholder="请选择供应商名称" clearable filterable remote :remote-method="getSupplierListByName">
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
    <div class="middle-form">
      <el-row :gutter="10">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            :disabled="form.fname ? false : true"
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
    </div>
    <div class="bottom-form">
      <el-table
        :data="form.yqPurchaseOrderDetailList"
        stripe
        style="width: 100%"
        height="100%">
        <el-table-column label="删除" fixed width="100" align="center">
          <template v-slot="scope">
            <el-button
              type="text"
              icon="el-icon-remove"
              @click="handleDelete(scope.$index, form.yqPurchaseOrderDetailList)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="fitemcode"
          label="编码">
        </el-table-column>
        <el-table-column
          prop="fbottle"
          label="品名">
        </el-table-column>
        <el-table-column
          prop="fbspec"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="fcateid"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="fprice"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="fqty"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="famount"
          label="金额">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注说明">
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加或修改采购对话框 -->
    <el-dialog :visible.sync="open" title="商品档案">
      <div slot="title" class="dialog-title">
        <i class="el-icon-menu"></i>
        商品档案
      </div>
      <popup :mdata="dataList" @close="handleCloseEvent"/>
    </el-dialog>
  </div>
</template>

<script>
import { getOrder, addOrder, updateOrder } from "@/api/purchase/order";
import { listSupplier } from "@/api/basic/supplier";
import { listItem } from "@/api/system/businessDictItem";
import { listUser } from "@/api/system/user";
import { getBill } from "@/api/system/bill";
import Popup from "@/components/Popup";

export default {
  name: "OrderDetail",
  data() {
    return {
      dataList: [
        {
          id: 1,
          name: "111"
        },
        {
          id: 2,
          name: "222"
        }
      ],
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
      productTemp: {}, // 所选商品临时信息
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
      this.getBillNumber();
    }
    this.getDictList();
  },
  methods: {
    /** 获取单据号 */
    getBillNumber() {
      getBill({
        prefix: 'TM'
      }).then(response => {
        this.reset()
        this.form.keyid = response.data
      })
    },
    /** 查询采购订单详情 */
    getOrderDetail(keyid) {
      getOrder(keyid).then(response => {
        this.loading = false
        this.reset()
        Object.assign(this.form, response.data)
      }, error => {
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
        fpoint: null,
        yqPurchaseOrderDetailList: []
      };
      this.resetForm("form");
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
      this.open = true
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
      this.open = false
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
      //     if (this.form.keyid != null) {
      //       updateOrder(this.form).then(response => {
      //         this.msgSuccess("保存成功");
      //         this.open = false;
      //         // this.getList();
      //       });
      //     } else {
      //       addOrder(this.form).then(response => {
      //         this.msgSuccess("新增成功");
      //         this.open = false;
      //         // this.getList();
      //       });
      //     }
      //   }
      // });
    },
    /** 删除按钮操作 */
    // handleDelete(row) {
    handleDelete(index, rows) {
      console.log(JSON.stringify(index))
      this.$confirm('是否确认删除商品编码为"' + rows[index].FItemCode + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          rows.splice(index,1)
        }).catch(() => {})
    },
    handleCloseEvent() {
      console.log('close')
      this.open = false
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
          this.getBillNumber();
        }
        const visitedViews = this.$store.state.tagsView.visitedViews
        for(let item of visitedViews) {
          if(item.path == this.$route.path) {
            item.title = this.title
          }
        }
      }
    }
  },
  components: {
    Popup
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
  .el-form-item {
    margin-bottom: 22px;
    width: 25%;
    display: inline-block;
  }
  .middle-form {
    padding: 10px;
    background-color: #dfeaf2;
  }
  .bottom-form {
    flex: 1;
    overflow: auto;
  }
  .cell > .el-button--text {
    color: #ff5722;
  }
  .cell > .el-button--medium, .deleteBtn >>> .el-button--mini {
    font-size: 24px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
  ::v-deep .el-dialog {
    width: 80%;
    background: #3892d3;
    height: 80vh;
    display: flex;
    flex-direction: column;
  }
  ::v-deep .el-dialog__title, ::v-deep .el-dialog__close {
    color: #fff;
  }
  ::v-deep .dialog-title {
    color: #fff;
  }
  ::v-deep .el-dialog__body {
    padding: 10px;
    height: calc(100% - 55px);
  }
  ::v-deep .el-dialog__headerbtn:focus .el-dialog__close, ::v-deep .el-dialog__headerbtn:hover .el-dialog__close {
    color: #f00 !important;
  }
</style>