<template>
  <div class="app-container">
    <div class="middle-form">
      <el-row :gutter="10">
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

    <div class="top-form">
      <!-- 采购入库详情表单 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="单据编号：" prop="keyid">
          <el-tooltip :content="form.keyid">
            <span>{{ form.keyid }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="制单人：" prop="createby">
          <el-tooltip :content="form.createby">
            <span>{{ form.createby }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="日期：" prop="fdate">
          <el-tooltip :content="form.fdate">
            <span>{{ form.fdate }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="对账单号：" prop="freconciliation">
          <el-tooltip :content="form.freconciliation">
            <span>{{ form.freconciliation }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="客户代码：" prop="fcode">
          <el-tooltip :content="form.fcode">
            <span>{{ form.fcode }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="客户名称：" prop="fname">
          <el-tooltip :content="form.fname">
            <span>{{ form.fname }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="地址：" prop="faddress">
          <el-tooltip :content="form.faddress">
            <span>{{ form.faddress }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="电话：" prop="fphone">
          <el-tooltip :content="form.fphone">
            <span>{{ form.fphone }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="联系人：" prop="flinkman">
          <el-tooltip :content="form.flinkman">
            <span>{{ form.flinkman }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="运输服务费：" prop="ffreight">
          <el-tooltip :content="form.ffreight">
            <span>{{ form.ffreight }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="押运员：" prop="fsupercargo">
          <el-tooltip :content="form.fsupercargo">
            <span>{{ form.fsupercargo }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="发货人：" prop="fshipper">
          <el-tooltip :content="form.fshipper">
            <span>{{ form.fshipper }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="车牌号：" prop="fvehiclenum">
          <el-tooltip :content="form.fvehiclenum">
            <span>{{ form.fvehiclenum }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="司机：" prop="fdriver">
          <el-tooltip :content="form.fdriver">
            <span>{{ form.fdriver }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="区域：" prop="farea">
          <el-tooltip :content="form.farea">
            <span>{{ form.farea }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="业务员：" prop="fsalesman">
          <el-tooltip :content="form.fsalesman">
            <span>{{ form.fsalesman }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="配送方式：" prop="fdeliverymethod">
          <el-tooltip :content="form.fdeliverymethod">
            <span>{{ form.fdeliverymethod }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="物流单号：" prop="flogisticsnumber">
          <el-tooltip :content="form.flogisticsnumber">
            <span>{{ form.flogisticsnumber }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="应付金额：" prop="famount">
          <el-tooltip :content="form.famount">
            <span>{{ form.famount }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="实付金额：" prop="famt">
          <el-tooltip :content="form.famt">
            <span>{{ form.famt }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="目前欠款：" prop="ft6purchasetype">
          <el-tooltip :content="form.ft6purchasetype">
            <span>{{ form.ft6purchasetype }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="备注：" prop="fmemo">
          <el-tooltip :content="form.fmemo">
            <span>{{ form.fmemo }}</span>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
  
    <div class="bottom-form">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="销售明细" name="first">
          <el-table
            :data="form.stockinDetailsList"
            stripe
            :header-cell-style="headerStyle"
            height="100%">
            <el-table-column
              prop="fitemcode"
              label="编码">
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
              prop="funit"
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
              prop="fbottle"
              label="包装物">
            </el-table-column>
            <el-table-column
              prop="fbottle"
              label="气瓶数量">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注说明">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="已提瓶">
            </el-table-column>
            <el-table-column
              prop="fcateid"
              label="类型">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="单据状态" name="second">单据状态</el-tab-pane>
        <el-tab-pane label="审批流程" name="third">审批流程</el-tab-pane>
        <el-tab-pane label="明细变更" name="fourth">明细变更</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getStockin } from "@/api/purchase/stockin";

export default {
  name: "StockinDetail",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 表单参数
      form: {},
      keyid: null,
      activeName: 'first'
    }
  },
  created() {
    this.keyid = this.$route.query.keyid
    if(this.keyid) {
      this.$route.meta.title = this.title = '采购入库单详情'
      this.getStockinDetail(this.keyid)
      // this.$message.success('获取采购入库单单据号成功');
    }else {
      // 获取采购入库单失败
      this.$message.error('获取采购入库单单据号失败');
    }
  },
  methods: {
    /** 查询采购订单详情 */
    getStockinDetail(keyid) {
      getStockin(keyid).then(response => {
        // console.log(JSON.stringify(response))
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
    /** 打印按钮操作 */
    handleUpdate(row) {
      
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
    
    headerStyle() {
      return "text-align: center;border: 1px solid #ccc;"
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
          this.getOrderDetail(this.keyid);
        }else {
          this.$route.meta.title = this.title = '添加采购入库单'
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
    margin-left: 0 !important;
    width: calc(100% - 100px);
    display: grid;
  }
  .el-form-item {
    margin-bottom: 3px;
    width: 25%;
    display: -webkit-inline-box;
  }
  .middle-form {
    padding: 10px;
    background-color: #dfeaf2;
  }
  .bottom-form {
    flex: 1;
    display: flex;
    flex-direction: column;
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
  span {
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: block;
  }
  .bottom-form >>> .el-tabs {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .bottom-form >>> .el-tabs__nav-wrap {
    background-color: #dfeaf2;
  }
  .bottom-form >>> .el-tabs__content {
    flex: 1;
  }
  .bottom-form >>> #pane-first,#pane-second,#pane-third,#pane-fourth {
    height: 100%;
  }
</style>