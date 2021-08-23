<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" class="search-form">
      <el-form-item label="助记码" prop="fspell">
        <el-input
          v-model="queryParams.fspell"
          placeholder="请输入助记码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户名称" prop="fname">
        <el-select v-model="queryParams.fname" placeholder="请选择客户名称" clearable size="small" filterable remote :remote-method="getSupplierListByName">
          <el-option v-for="(item, index) in supplierListName" :key="index" :label="item.fname" :value="item.fcode" />
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
          v-hasPermi="['sales:address:search']"
        >查询</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-add"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['sales:address:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['sales:address:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-print"
          size="mini"
          @click="handlePrint"
          v-hasPermi="['sales:address:print']"
        >打印</el-button>
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
      <el-table-column label="客户代码" align="center" prop="fcode" />
      <el-table-column label="客户名称" align="center" prop="fname" />
      <el-table-column label="联系人" align="center" prop="flinkman" />
      <el-table-column label="电话" align="center" prop="ftel" />
      <el-table-column label="手机" align="center" prop="fphone" />
      <el-table-column label="邮寄地址" align="center" prop="faddress" />
      <el-table-column label="邮编" align="center" prop="fpostcode" />
      <el-table-column label="打印时间" align="center" prop="fprinttime" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商品名称" prop="fname">
          <el-input v-model="form.fname" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="助记码" prop="fspell">
          <el-input v-model="form.fspell" placeholder="请输入助记码" />
        </el-form-item>
        <el-form-item label="产品组号" prop="fgroupnum">
          <el-input v-model="form.fgroupnum" placeholder="请输入产品组号" />
        </el-form-item>
        <el-form-item label="规格" prop="fspec">
          <el-input v-model="form.fspec" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="单位" prop="funit">
          <el-select v-model="form.funit" placeholder="请选择单位">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="fcateid">
          <el-input v-model="form.fcateid" placeholder="请输入分类" />
        </el-form-item>
        <el-form-item label="子分类" prop="fsubcateid">
          <el-input v-model="form.fsubcateid" placeholder="请输入子分类" />
        </el-form-item>
        <el-form-item label="采购价" prop="fpurchaseprice">
          <el-input v-model="form.fpurchaseprice" placeholder="请输入采购价" />
        </el-form-item>
        <el-form-item label="销售价" prop="fsalesprice">
          <el-input v-model="form.fsalesprice" placeholder="请输入销售价" />
        </el-form-item>
        <el-form-item label="备注">
          <editor v-model="form.fmemo" :min-height="192"/>
        </el-form-item>
        <el-form-item label="计件发出" prop="fpiecework1">
          <el-input v-model="form.fpiecework1" placeholder="请输入计件发出" />
        </el-form-item>
        <el-form-item label="计件收回" prop="fpiecework2">
          <el-input v-model="form.fpiecework2" placeholder="请输入计件收回" />
        </el-form-item>
        <el-form-item label="计件发出" prop="fpiecework3">
          <el-input v-model="form.fpiecework3" placeholder="请输入计件发出" />
        </el-form-item>
        <el-form-item label="计件收回" prop="fpiecework4">
          <el-input v-model="form.fpiecework4" placeholder="请输入计件收回" />
        </el-form-item>
        <el-form-item label="充装计价" prop="fpiecework5">
          <el-input v-model="form.fpiecework5" placeholder="请输入充装计价" />
        </el-form-item>
        <el-form-item label="重量" prop="fnetweight">
          <el-input v-model="form.fnetweight" placeholder="请输入重量" />
        </el-form-item>
        <el-form-item label="库位货架" prop="frack">
          <el-input v-model="form.frack" placeholder="请输入库位货架" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOut, getOut, delOut, addOut, updateOut, exportOut } from "@/api/sales/out";
import { listSupplier } from "@/api/basic/supplier";
import { listItem } from "@/api/system/businessDictItem";

export default {
  name: "Address",
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
        fspell: null,
        fname: null
      },
      supplierListNameParams: { // 通过Name查询供应商参数
        pageNum: 1,
        pageSize: 20,
        fname: null
      },
      supplierListName: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        fcode: [
          { required: true, message: "商品代码不能为空", trigger: "blur" }
        ],
        fname: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        fpurchaseprice: [
          { required: true, message: "采购价不能为空", trigger: "blur" }
        ],
        fsalesprice: [
          { required: true, message: "销售价不能为空", trigger: "blur" }
        ],
        fpiecework1: [
          { required: true, message: "计件发出不能为空", trigger: "blur" }
        ],
        fpiecework2: [
          { required: true, message: "计件收回不能为空", trigger: "blur" }
        ],
        fpiecework3: [
          { required: true, message: "计件发出不能为空", trigger: "blur" }
        ],
        fpiecework4: [
          { required: true, message: "计件收回不能为空", trigger: "blur" }
        ],
        fpiecework5: [
          { required: true, message: "充装计价不能为空", trigger: "blur" }
        ],
        fnetweight: [
          { required: true, message: "重量不能为空", trigger: "blur" }
        ]
      },
      // 弹出层标题
      title: "",
      // 是否显示弹出框
      open: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询发货单列表 */
    getList() {
      this.loading = true;
      listOut(this.queryParams).then(response => {
        this.outList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
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
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.keyid)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true
    },
    /** 上传按钮操作 */
    handlePrint(row) {
      const keyid = row.keyid || this.ids
      // 打印操作
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