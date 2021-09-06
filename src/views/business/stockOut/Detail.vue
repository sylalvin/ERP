<!-- 出仓单详情 -->
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
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="单据编号：" prop="keyid">
          <el-tooltip :content="form.keyid">
            <span>{{ form.keyid }}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="制单人：" prop="createby">
            <span>{{ form.createby }}</span>
        </el-form-item>
        <el-form-item label="日期：" prop="fdate">
            <span>{{ form.fdate }}</span>
        </el-form-item>
        <el-form-item label="出仓类型：" prop="fcate">
            <span>{{ form.fcate }}</span>
        </el-form-item>
        <el-form-item label="备注：" prop="fmemo">
            <span>{{ form.fmemo }}</span>
        </el-form-item>
      </el-form>
    </div>
  
    <div class="bottom-form">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="销售明细" name="first">
          <el-table
            :data="form.stockinDetailsList"
            stripe
            :summary-method="getSummaries"
            show-summary
            :header-cell-style="headerStyle"
            height="99%">
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
              prop="fqty"
              label="数量">
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
              prop="fmemo"
              label="备注说明">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="已提瓶">
            </el-table-column>
            <el-table-column
              prop="fcate"
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
  name: "StockOutDetail",
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
      this.$route.meta.title = this.title = '出仓单详情'
      this.getStockinDetail(this.keyid)
      // this.$message.success('获取出仓单单据号成功');
    }else {
      // 获取出仓单失败
      this.$message.error('获取出仓单单据号失败');
    }
  },
  methods: {
    /** 查询出仓单详情 */
    getStockinDetail(keyid) {
      getStockin(keyid).then(response => {
        this.loading = false
        this.reset()
        Object.assign(this.form, response.data)
      }, error => {
        this.loading = false
        this.reset()
        this.form.keyid = this.keyid
      })
    },
    // 表单重置
    reset() {
      this.form = {
        keyid: null,
        createby: null,
        fdate: null,
        fmemo: null,
        fcate: null,
        stockinDetailsList: [],
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
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if (index === 5 || index === 6 || index === 8 || index === 10) {
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
        if(val.path != '/business/stockOut/detail') return
        this.keyid = this.$route.query.keyid
        if(this.keyid) {
          this.$route.meta.title = this.title = '出仓单详情'
          this.getStockinDetail(this.keyid);
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
  .bottom-form >>> .el-table__footer-wrapper {
    position: absolute;
    bottom: 0;
  }
  .bottom-form >>> .el-table__body-wrapper {
    overflow: auto;
  }
  .bottom-form >>> .el-table__footer-wrapper .cell {
    color: red;
  }
</style>