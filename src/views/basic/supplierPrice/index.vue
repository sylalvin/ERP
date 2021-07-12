<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" class="search-form">
      <el-form-item label="供应商名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入供应商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品名称" prop="productName">
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入商品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="采购价" prop="fprice">
        <el-input
          v-model="queryParams.fprice"
          placeholder="请输入采购价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属公司ID" prop="fcompanyid">
        <el-input
          v-model="queryParams.fcompanyid"
          placeholder="请输入所属公司ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建者" prop="fcreateby">
        <el-input
          v-model="queryParams.fcreateby"
          placeholder="请输入创建者"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="fcreatedate">
        <el-date-picker clearable size="small"
          v-model="queryParams.fcreatedate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="修改者" prop="fupdateby">
        <el-input
          v-model="queryParams.fupdateby"
          placeholder="请输入修改者"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="修改时间" prop="fupdatedate">
        <el-date-picker clearable size="small"
          v-model="queryParams.fupdatedate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择修改时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审计员" prop="fauditor">
        <el-input
          v-model="queryParams.fauditor"
          placeholder="请输入审计员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审计时间" prop="fauditdate">
        <el-date-picker clearable size="small"
          v-model="queryParams.fauditdate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择审计时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="启用标志位" prop="fflag">
        <el-input
          v-model="queryParams.fflag"
          placeholder="请输入启用标志位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['basic:price:add']"
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
          v-hasPermi="['basic:price:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['basic:price:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
		  :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['basic:price:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="priceList" @selection-change="handleSelectionChange" height="100%">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="ID" align="center" prop="fid" /> -->
      <el-table-column label="供应商代码" align="center" prop="fcode" />
      <el-table-column label="供应商名称" align="center" prop="companyName" />
      <el-table-column label="商品代码" align="center" prop="fitemcode" />
      <el-table-column label="商品名称" align="center" prop="productName" />
      <el-table-column label="规格" align="center" prop="productSpec" />
      <el-table-column label="采购价" align="center" prop="fprice" />
      <!-- <el-table-column label="所属公司ID" align="center" prop="fcompanyid" />
      <el-table-column label="创建者" align="center" prop="fcreateby" />
      <el-table-column label="创建时间" align="center" prop="fcreatedate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fcreatedate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改者" align="center" prop="fupdateby" />
      <el-table-column label="修改时间" align="center" prop="fupdatedate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fupdatedate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审计员" align="center" prop="fauditor" />
      <el-table-column label="审计时间" align="center" prop="fauditdate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fauditdate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="启用标志位" align="center" prop="fflag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:price:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:price:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改供应商采购价对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="供应商名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-form-item label="商品名称" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="采购价" prop="fprice">
          <el-input v-model="form.fprice" placeholder="请输入采购价" />
        </el-form-item>
        <!-- <el-form-item label="所属公司ID" prop="fcompanyid">
          <el-input v-model="form.fcompanyid" placeholder="请输入所属公司ID" />
        </el-form-item>
        <el-form-item label="创建者" prop="fcreateby">
          <el-input v-model="form.fcreateby" placeholder="请输入创建者" />
        </el-form-item>
        <el-form-item label="创建时间" prop="fcreatedate">
          <el-date-picker clearable size="small"
            v-model="form.fcreatedate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="修改者" prop="fupdateby">
          <el-input v-model="form.fupdateby" placeholder="请输入修改者" />
        </el-form-item>
        <el-form-item label="修改时间" prop="fupdatedate">
          <el-date-picker clearable size="small"
            v-model="form.fupdatedate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择修改时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审计员" prop="fauditor">
          <el-input v-model="form.fauditor" placeholder="请输入审计员" />
        </el-form-item>
        <el-form-item label="审计时间" prop="fauditdate">
          <el-date-picker clearable size="small"
            v-model="form.fauditdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择审计时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="启用标志位" prop="fflag">
          <el-input v-model="form.fflag" placeholder="请输入启用标志位" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPrice, getPrice, delPrice, addPrice, updatePrice, exportPrice } from "@/api/basic/supplierPrice";

export default {
  name: "SupplierPrice",
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
      // 供应商采购价表格数据
      priceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fcode: null,
        fitemcode: null,
        productName: null,
        fprice: null,
        fcompanyid: null,
        companyName: null,
        productSpec: null,
        fcreateby: null,
        fcreatedate: null,
        fupdateby: null,
        fupdatedate: null,
        fauditor: null,
        fauditdate: null,
        fflag: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // fcreatedate: [
        //   { required: true, message: "创建时间不能为空", trigger: "blur" }
        // ],
        // fupdatedate: [
        //   { required: true, message: "修改时间不能为空", trigger: "blur" }
        // ],
        // fauditdate: [
        //   { required: true, message: "审计时间不能为空", trigger: "blur" }
        // ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询供应商采购价列表 */
    getList() {
      this.loading = true;
      listPrice(this.queryParams).then(response => {
        this.priceList = response.rows;
        this.total = response.total;
        this.loading = false;
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
        fid: null,
        fcode: null,
        fitemcode: null,
        productName: null,
        fprice: null,
        fcompanyid: null,
        companyName: null,
        productSpec: null,
        fcreateby: null,
        fcreatedate: null,
        fupdateby: null,
        fupdatedate: null,
        fauditor: null,
        fauditdate: null,
        fflag: null
      };
      this.resetForm("form");
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
      this.ids = selection.map(item => item.fid)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加供应商采购价";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const fid = row.fid || this.ids
      getPrice(fid).then(response => {
        console.log(response)
        this.form = response.data;
        this.open = true;
        this.title = "修改供应商采购价";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.fid != null) {
            updatePrice(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPrice(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const fids = row.fid || this.ids;
      this.$confirm('是否确认删除供应商采购价编号为"' + fids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPrice(fids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有供应商采购价数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportPrice(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
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
