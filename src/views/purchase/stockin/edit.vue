<template>
  <div class="app-container">
    <div class="top-form">
      <!-- 添加或修改采购入库表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="单据编号" prop="keyid">
          <el-input v-model="form.keyid" disabled />
        </el-form-item>
        <el-form-item label="制单人" prop="createby">
          <el-input v-model="form.createby" disabled />
        </el-form-item>
        <el-form-item label="日期" prop="fdate">
          <el-date-picker clearable
            v-model="form.fdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="对账单号" prop="freconciliation">
          <el-input v-model="form.freconciliation" placeholder="请输入对账单号" />
        </el-form-item>
        <el-form-item label="客户代码" prop="fcode">
          <el-select v-model="form.fcode" placeholder="请选择客户代码" clearable filterable remote :remote-method="getSupplierListByCode">
            <el-option v-for="(item, index) in supplierListCode" :key="index" :label="item.fcode" :value="item.fcode" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称" prop="fname">
          <el-select v-model="form.fname" placeholder="请选择客户名称" clearable filterable remote :remote-method="getSupplierListByName">
          <el-option v-for="(item, index) in supplierListName" :key="index" :label="item.fname" :value="item.fcode" />
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="faddress">
          <el-input v-model="form.faddress" placeholder="地址" />
        </el-form-item>
        <el-form-item label="电话" prop="fphone">
          <el-input v-model="form.fphone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="联系人" prop="flinkman">
          <el-input v-model="form.flinkman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="运输服务费" prop="ffreight">
          <el-input v-model="form.ffreight" placeholder="请输入运输服务费" />
        </el-form-item>
        <el-form-item label="押运员" prop="fsupercargo">
          <el-select v-model="form.fsupercargo" placeholder="请选择押运员">
            <el-option v-for="(item, index) in operationDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="发货人" prop="fshipper">
          <el-select v-model="form.fshipper" placeholder="请选择发货人">
            <el-option v-for="(item, index) in operationDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号" prop="fvehiclenum">
          <el-select v-model="form.fvehiclenum" placeholder="请选择车牌号">
            <el-option v-for="(item, index) in operationDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="司机" prop="fdriver">
          <el-select v-model="form.fdriver" placeholder="请选择司机">
            <el-option v-for="(item, index) in driverList" :key="index" :label="item.userName" :value="item.userId" />
          </el-select>
        </el-form-item>
        <el-form-item label="区域" prop="farea">
          <el-select v-model="form.farea" placeholder="请选择区域">
            <el-option v-for="(item, index) in areaDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="业务员" prop="fsalesman">
          <el-select v-model="form.fsalesman" placeholder="请选择业务员">
            <el-option v-for="(item, index) in operationDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="配送方式" prop="fdeliverymethod">
          <el-select v-model="form.fdeliverymethod" placeholder="请选择配送方式">
            <el-option v-for="(item, index) in deliveryDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="采购订单" prop="flogisticsnumber">
          <el-select v-model="form.flogisticsnumber" placeholder="请选择采购订单" clearable filterable remote :remote-method="getSupplierListByCode">
            <el-option v-for="(item, index) in supplierListCode" :key="index" :label="item.fcode" :value="item.fcode" />
          </el-select>
        </el-form-item>
        <el-form-item label="银行账户" prop="fsubjectcode">
          <el-select v-model="form.fsubjectcode" placeholder="请选择银行账户">
            <el-option v-for="(item, index) in deliveryDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款金额" prop="famt">
          <el-input v-model="form.famt" placeholder="请输入付款金额" />
        </el-form-item>
        <el-form-item label="采购类型" prop="ft6purchasetype">
          <el-select v-model="form.ft6purchasetype" placeholder="请选择采购类型">
            <el-option v-for="(item, index) in deliveryDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="收发类型" prop="ft6receivesendtype">
          <el-select v-model="form.ft6receivesendtype" placeholder="请选择收发类型">
            <el-option v-for="(item, index) in deliveryDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="币种" prop="ft6currency">
          <el-select v-model="form.ft6currency" placeholder="请选择币种">
            <el-option v-for="(item, index) in deliveryDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="汇率" prop="ft6exchangerate">
          <el-input v-model="form.ft6exchangerate" placeholder="请输入汇率" />
        </el-form-item>
        <el-form-item label="作业区" prop="fdistributionpoint">
          <el-select v-model="form.fdistributionpoint" placeholder="请选择作业区">
            <el-option v-for="(item, index) in deliveryDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库" prop="ft6warehouse">
          <el-select v-model="form.ft6warehouse" placeholder="请选择仓库">
            <el-option v-for="(item, index) in deliveryDictList" :key="index" :label="item.fvalue" :value="item.fid" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="fmemo">
          <el-input v-model="form.fmemo" placeholder="请输入备注" />
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
            v-hasPermi="['purchase:stockin:add']"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
            @click="handleUpdate"
            v-hasPermi="['purchase:stockin:edit']"
          >保存</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-edit"
            size="mini"
            @click="handleUpdate"
            v-hasPermi="['purchase:stockin:edit']"
          >打印</el-button>
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
        :data="form.stockinDetailsList"
        stripe
        :summary-method="getSummaries"
        show-summary
        :header-cell-style="headerStyle"
        height="100%">
        <el-table-column label="删除" fixed width="100" align="center">
          <template v-slot="scope">
            <el-button
              type="text"
              icon="el-icon-remove"
              @click="handleDelete(scope.$index, form.stockinDetailsList)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="fitemcode"
          label="编码">
          <template v-slot="scope">
            <el-input
              type="text"
              class="product"
              :class="{activeBorder: activeText == (scope.row.fid + '-' + 'fitemcode')}"
              @focus="handleFocusDo(scope.row.fid + '-' + 'fitemcode')"
              v-model="scope.row.fitemcode" />
          </template>
        </el-table-column>
        <el-table-column
          prop="ft6warehouse"
          label="仓库">
        </el-table-column>
        <el-table-column
          prop="fitemname"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="fspec"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="funit"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="fqty"
          label="商品入库数">
          <template v-slot="scope">
            <el-input
              type="number"
              class="product"
              :class="{activeBorder: activeText == (scope.row.fid + '-' + 'fqty')}"
              @focus="handleFocus(scope.row.fid + '-' + 'fqty')"
              v-model="scope.row.fqty" />
          </template>
        </el-table-column>
        <el-table-column
          prop="fbottleqty"
          label="容器入库数">
          <template v-slot="scope">
            <el-input
              type="number"
              class="product"
              :class="{activeBorder: activeText == (scope.row.fid + '-' + 'fbottleqty')}"
              @focus="handleFocus(scope.row.fid + '-' + 'fbottleqty')"
              v-model="scope.row.fbottleqty" />
          </template>
        </el-table-column>
        <el-table-column
          prop="freturnqty"
          label="商品出库数">
          <template v-slot="scope">
            <el-input
              type="number"
              class="product"
              :class="{activeBorder: activeText == (scope.row.fid + '-' + 'freturnqty')}"
              @focus="handleFocus(scope.row.fid + '-' + 'freturnqty')"
              v-model="scope.row.freturnqty" />
          </template>
        </el-table-column>
        <el-table-column
          prop="frecycleqty"
          label="容器出库数">
          <template v-slot="scope">
            <el-input
              type="number"
              class="product"
              :class="{activeBorder: activeText == (scope.row.fid + '-' + 'frecycleqty')}"
              @focus="handleFocus(scope.row.fid + '-' + 'frecycleqty')"
              v-model="scope.row.frecycleqty" />
          </template>
        </el-table-column>
        <el-table-column
          prop="fbottle"
          label="包装物">
          <template v-slot="scope">
            <el-select 
              v-model="scope.row.fbottle"
              filterable 
              placeholder="请选择"
              class="product"
              :class="{activeBorder: activeText == (scope.row.fid + '-' + 'fbottle')}"
              @focus="handleFocus(scope.row.fid + '-' + 'fbottle')">
              <el-option
                v-for="item in bottleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注说明">
          <template v-slot="scope">
            <el-input
              type="text"
              class="product"
              :class="{activeBorder: activeText == (scope.row.fid + '-' + 'remark')}"
              @focus="handleFocus(scope.row.fid + '-' + 'remark')"
              v-model="scope.row.remark" />
          </template>
        </el-table-column>
        <el-table-column
          prop="fcateid"
          label="类型">
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加或修改采购对话框 -->
    <el-dialog :visible.sync="open" title="商品档案">
      <div slot="title" class="dialog-title">
        <i class="el-icon-menu"></i>
        商品档案
      </div>
      <popup :category-list="categoryList" :request-data="requestData" :loading="popupLoading" @close="handleCloseEvent" @search="handleSearchEvent" @confirm="handleConfirmEvent"/>
    </el-dialog>
  </div>
</template>

<script>
import { getStockin, addStockin, updateStockin } from "@/api/purchase/stockin";
import { listSupplier } from "@/api/basic/supplier";
import { listDict } from "@/api/system/businessDict";
import { listItem } from "@/api/system/businessDictItem";
import { listUser } from "@/api/system/user";
import { getBill } from "@/api/system/bill";
import { listPrice } from "@/api/basic/supplierPrice";
import Popup from "@/components/Popup";

export default {
  name: "StockinEdit",
  data() {
    return {
      categoryList: [],
      requestData: {
        rows: [],
        total: 0
      },
      // 遮罩层
      loading: true,
      popupLoading: false,
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
      userListParams: { // 获取用户列表参数
        pageNum: 1,
        pageSize: 20,
        postid: null
      },
      productListParams: {}, // 查询商品参数
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
      driverList: [], // 司机
      supercargoList: [], // 押运员
      salesmanList: [], // 业务员
      carnoList: [], // 车牌号
      senderList: [], // 发货人
      keyid: null,
      activeText: '',
      bottleList: []
    }
  },
  created() {
    this.keyid = this.$route.query.keyid
    if(this.keyid) {
      this.$route.meta.title = this.title = '编辑采购入库单'
      this.getStockinDetail(this.keyid)
    }else {
      this.$route.meta.title = this.title = '添加采购入库单'
      this.getBillNumber();
    }
    this.getDictList();
    this.getCategory(); // 获取产品数据对象
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
    getStockinDetail(keyid) {
      getStockin(keyid).then(response => {
        // console.log(JSON.stringify(response))
        this.loading = false
        this.reset()
        Object.assign(this.form, response.data)
        this.calcHeight()
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
        pageSize: 100
      }).then(response => {
        // console.log('User=====' + JSON.stringify(response.rows))
        this.driverList = response.rows
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
        createTime: null,
        updateTime: null,
        remark: null,
        params: null,
        keyid: null,
        fcompanyid: null,
        fdate: null,
        beginDate: null,
        endDate: null,
        fcode: null,
        fname: null,
        faddress: null,
        fphone: null,
        flinkman: null,
        fvehiclenum: null,
        fdeliverymethod: null,
        fdriver: null,
        fsupercargo: null,
        fshipper: null,
        fmemo: null,
        fflag: null,
        fupdateby: null,
        fupdate: null,
        ftype: null,
        ffreight: null,
        famount: null,
        famt: null,
        fdiscountamount: null,
        fprogress: null,
        fstatus: null,
        freconciliation: null,
        fsalesman: null,
        farea: null,
        flogisticsnumber: null,
        fdeleteflag: null,
        fcate: null,
        fsubjectcode: null,
        fsubjectname: null,
        fassociatedno: null,
        fdispatchnum: null,
        fsknum: null,
        fclass: null,
        ft6warehouse: null,
        ft6saletype: null,
        ft6saletypenum: null,
        ft6purchasetype: null,
        ft6purchasetypenum: null,
        ft6receivesendtype: null,
        ft6receivesendtypenum: null,
        ft6department: null,
        ft6currency: null,
        ft6exchangerate: null,
        ft6status: null,
        ft6date: null,
        fdistributionpoint: null,
        fgroup: null,
        ftime1: null,
        ftime2: null,
        ftime3: null,
        ftime4: null,
        stockinDetailsList: [],
        stockinDetail: null,
        createBy: null,
      };
      this.resetForm("form");
    },
    /** 保存按钮操作 */
    handleUpdate(row) {
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
      //     if (this.form.keyid != null) { // 更新逻辑
      //       updateOrder(this.form).then(response => {
      //         this.msgSuccess("保存成功");
      //         this.open = false;
      //         // this.getList();
      //       });
      //     } else { // 新增逻辑
      //       addOrder(this.form).then(response => {
      //         this.msgSuccess("新增成功");
      //         this.open = false;
      //         // this.getList();
      //       });
      //     }
      //   }
      // });
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
    /** 删除按钮操作 */
    handleDelete(index, rows) {
      this.$confirm('是否确认删除商品："' + rows[index].fitemname, "警告", {
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
    },
    handleSearchEvent(queryParams) {
      this.popupLoading = true
      queryParams.fcode = this.form.fcode
      this.productListParams = queryParams
      console.log('search========' + JSON.stringify(queryParams))
      // 根据条件查询商品
      listPrice(
        queryParams
      ).then(response => {
        // 数据处理
        this.popupLoading = false
        // console.log(JSON.stringify(response))
        this.requestData.total = response.total
        this.requestData.rows = response.rows
      })
    },
    handleConfirmEvent(data) {
      // 选择完成后，新增到产品列表
      console.log(JSON.stringify(this.form.stockinDetailsList))
      if(data.length >0) {
        for(let val of data) {
          console.log(JSON.stringify(val))
          let temp = {}
          temp.createTime = val.createTime
          temp. updateTime = val.updateTime
          temp.remark = val.remark
          temp.params = {}
          temp.fid = val.fid
          temp.keyid = ''
          temp.fitemcode = val.fitemcode
          temp.fitemname = val.productName
          temp.fspec = val.productSpec
          temp.funit = val.funit
          temp.fprice = val.fprice
          temp.fqty = 0
          temp.famount = 0
          temp.fbottle = ''
          temp.fbottleqty = 0
          temp.fcompanyid = 1
          temp.fcateid = val.fcateid
          temp.fmemo = null
          temp.fbspec = val.productSpec
          this.form.stockinDetailsList.push(temp)
        }
      }
      this.open = false
    },
    getCategory() {
      listDict({
        pageNum: 1,
        pageSize: 100
      }).then(response => {
        this.categoryList[0] = {}
        this.categoryList[0].key = '产品分类'
        this.categoryList[0].fid = '0000'
        this.categoryList[0].value = response.rows.filter(item => {
          return item.fid == '2000' || item.fid == '2001' || item.fid == '2002'
        })
        for(let value of this.categoryList[0].value) {
          listItem({
            pageNum: 1,
            pageSize: 100,
            fsparent: value.fid
          }).then(response => {
            value.childList = response.rows
            if(this.categoryList[0].value[this.categoryList[0].value.length-1] == value) {
              // console.log(JSON.stringify(this.categoryList))
            }
          })
        }
      })
    },
    handleFocus(text) {
      this.activeText = '' // 清除样式
      this.activeText = text
    },
    handleFocusDo(text) {
      this.activeText = '' // 清除样式
      this.activeText = text
      this.open = true
    },
    headerStyle() {
      return "text-align: center;border: 1px solid #ccc;"
    },
    getSummaries(param) {
      // console.log(JSON.stringify(param))
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if (index === 6 || index === 7 || index === 8 || index === 9) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          }
        }
      });
      return sums;
    },
    calcHeight() {
      console.log("ssssssssssssss")
      
      //必须加延时，要不然赋不上去值
      setTimeout(() => {
        //通过原生方法，获取dom节点的高度------获取element-ui table表格header的元素
        let header = (window.document.getElementsByClassName('el-table__fixed-header-wrapper'))[0]
        console.log(header)
        //通过原生方法，获取dom节点的高度------获取element-ui table表格body的元素
        let body = (window.document.getElementsByClassName('el-table__fixed-body-wrapper'))[0]
        console.log(body)
        body.style.top = (header.clientHeight) + 'px';
      }, 500)
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
        if(val.path != '/purchase/stockin/edit') return
        this.keyid = this.$route.query.keyid
        if(this.keyid) {
          this.$route.meta.title = this.title = '编辑采购入库单'
          this.getStockinDetail(this.keyid);
        }else {
          this.$route.meta.title = this.title = '添加采购入库单'
          this.getBillNumber();
        }
        // this.calcHeight()
        const visitedViews = this.$store.state.tagsView.visitedViews
        for(let item of visitedViews) {
          if(item.path == this.$route.path) {
            item.title = this.title
          }
        }
      }
    },
    'form.fcode': function(newVal, oldVal) {
      if((newVal != null) && (newVal != oldVal)) {
          this.productListParams.fcode = newVal
          this.handleSearchEvent(this.productListParams)
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
    margin-bottom: 3px;
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
  ::v-deep .product .el-input__inner {
    border: none;
    background: none;
  }
  .activeBorder {
    border: #ff5722 solid 1px;
    border-radius: 5%;
  }
  .bottom-form >>> .el-table__footer-wrapper {
    position: absolute;
    bottom: 0;
  }
  .bottom-form >>> .el-table__body-wrapper {
    overflow: auto;
  }
  .bottom-form >>> .el-table__fixed-footer-wrapper tbody td {
    color: red !important;
  }
  .bottom-form >>> .el-table__footer-wrapper .cell {
    color: red !important;
  }
  /* ::v-deep .el-table__fixed-body-wrapper {
    top: 45px !important;
  } */
</style>