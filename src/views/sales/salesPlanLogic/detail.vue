<template>
  <div class="app-container">
    <div class="top-form">
      <!-- 收发任务详情 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="单据编号" prop="keyid">
          <el-input v-model="form.keyid" disabled />
        </el-form-item>
        <el-form-item label="制单人" prop="createby">
          <el-input v-model="form.createby" disabled />
        </el-form-item>
        <el-form-item label="配送日期" prop="fdate">
          <el-input v-model="form.fdate" />
        </el-form-item>
        <el-form-item label="对账单号" prop="freconciliation">
          <el-input v-model="form.freconciliation" />
        </el-form-item>
        <el-form-item label="客户代码" prop="fcode">
          <el-input v-model="form.fcode" />
        </el-form-item>
        <el-form-item label="客户名称" prop="fname">
          <el-input v-model="form.fname" />
        </el-form-item>
        <el-form-item label="计划类型" prop="ft6saletype">
          <el-input v-model="form.ft6saletype" />
        </el-form-item>
        <el-form-item label="电话" prop="fphone">
          <el-input v-model="form.fphone" />
        </el-form-item>
        <el-form-item label="联系人" prop="flinkman">
          <el-input v-model="form.flinkman" />
        </el-form-item>
        <el-form-item label="运输服务费" prop="ffreight">
          <el-input v-model="form.ffreight" />
        </el-form-item>
        <el-form-item label="车牌号" prop="fvehiclenum">
          <el-input v-model="form.fvehiclenum" />
        </el-form-item>
        <el-form-item label="司机" prop="fdriver">
          <el-input v-model="form.fdriver" />
        </el-form-item>
        <el-form-item label="押运员" prop="fsupercargo">
          <el-input v-model="form.fsupercargo" />
        </el-form-item>
        <el-form-item label="发货人" prop="fshipper">
          <el-input v-model="form.fshipper" />
        </el-form-item>
        <el-form-item label="业务员" prop="fsalesman">
          <el-input v-model="form.fsalesman" />
        </el-form-item>
        <el-form-item label="备注" prop="fmemo">
          <el-input v-model="form.fmemo" />
        </el-form-item>
        <el-form-item label="作业区" prop="fdistributionpoint">
          <el-input v-model="form.fdistributionpoint" />
        </el-form-item>
        <el-form-item label="配送方式" prop="fdeliverymethod">
          <el-input v-model="form.fdeliverymethod" />
        </el-form-item>
        <el-form-item label="物流单号" prop="flogisticsnumber">
          <el-input v-model="form.flogisticsnumber" />
        </el-form-item>
        <el-form-item label="所属部门" prop="fdeliverymethod">
          <el-input v-model="form.fdeliverymethod" />
        </el-form-item>
        <el-form-item label="地址" prop="faddress">
          <el-input v-model="form.faddress" />
        </el-form-item>
      </el-form>
    </div>
    <div class="middle-form">
      <el-row :gutter="10">
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
        :data="form.stockOutDetailsList"
        stripe
        :summary-method="getSummaries"
        show-summary
        :header-cell-style="headerStyle"
        height="100%">
        <el-table-column
          prop="fitemcode"
          label="编码">
        </el-table-column>
        <el-table-column
          prop="fitemname"
          label="品名">
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
          label="订单数量">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注说明">
        </el-table-column>
        <el-table-column
          prop="fnum"
          label="订单号码">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getOut, addOut, updateOut } from "@/api/sales/out";

export default {
  name: "SalesPlanLogicDetail",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        keyid: [
          { required: true, message: "单据编号不能为空", trigger: "blur" }
        ],
      },
      keyid: null
    }
  },
  created() {
    this.keyid = this.$route.query.keyid
    if(this.keyid) {
      this.$route.meta.title = this.title = '收发任务详情'
      this.getOutDetail(this.keyid)
    }
  },
  methods: {
    /** 查询采购订单详情 */
    getOutDetail(keyid) {
      getOut(keyid).then(response => {
        console.log(JSON.stringify(response))
        this.loading = false
        this.reset()
        Object.assign(this.form, response.data)
      }, error => {
        this.loading = false
      })
    },
    // 表单重置
    reset() {
      this.form = {
        "createTime": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "keyid": null,
        "fcompanyid": 1,
        "fdate": null,
        "fcode": null,
        "fname": null,
        "faddress": null,
        "fphone": null,
        "flinkman": null,
        "fvehiclenum": null,
        "fdeliverymethod": null,
        "fdriver": null,
        "fsupercargo": null,
        "fsalesman": null,
        "fmemo": null,
        "fflag": 1,
        "fupdateby": null,
        "createby": null,
        "fupdatedate": null,
        "ftype": null,
        "beginDate": null,
        "endDate": null,
        "ffreight": null,
        "famount": 0,
        "famt": null,
        "fdiscountamount": null,
        "fshipper": null,
        "fprogress": null,
        "fstatus": null,
        "freconciliation": null,
        "fauditflag": null,
        "flogisticsnumber": null,
        "fdeleteflag": 1,
        "fcate": "客户",
        "fsubjectcode": null,
        "fsubjectname": null,
        "fassociatedno": null,
        "fdispatchnum": null,
        "ft6warehouse": null,
        "ft6saletype": null,
        "ft6saletypenum": null,
        "ft6receivesendtype": null,
        "ft6receivesendtypenum": null,
        "ft6currency": null,
        "ft6exchangerate": null,
        "ft6status": null,
        "fdistributionpoint": null,
        "forgid": null,
        "forgname": null,
        "ft6billstatus": null,
        "ft6paymentstatus": null,
        "fpoint": null,
        "fgroup": null,
        "fsendee": null,
        "freceiver": null,
        "ft6date": null,
        "ftime1": null,
        "ftime2": null,
        "ftime3": null,
        "ftime4": null,
        "stockOutDetailsList": [],
        "stockOutDetail": null,
        "pubnum": null
      };
      this.resetForm("form");
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
    getSummaries(param) {
      // console.log(JSON.stringify(param))
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if (index === 4) {
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
        if(val.path != '/sales/salesPlanLogic/detail') return
        this.keyid = this.$route.query.keyid
        if(this.keyid) {
          this.$route.meta.title = this.title = '收发任务详情'
          this.getOrderDetail(this.keyid);
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
</style>