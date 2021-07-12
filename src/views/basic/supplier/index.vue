<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="客户代码" prop="fcode">
        <el-input
          v-model="queryParams.fcode"
          placeholder="请输入客户代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户名称" prop="fname">
        <el-input
          v-model="queryParams.fname"
          placeholder="请输入客户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="助记码" prop="fspell">
        <el-input
          v-model="queryParams.fspell"
          placeholder="请输入助记码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      
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
          v-hasPermi="['basic:supplier:add']"
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
          v-hasPermi="['basic:supplier:edit']"
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
          v-hasPermi="['basic:supplier:remove']"
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
          v-hasPermi="['basic:supplier:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList(queryParams.fsubcateid, activeWhich)"></right-toolbar>
    </el-row>
    <div class="d-flex">
      <div class="container-left">
        <el-collapse v-model="activeNames" class="collapse" v-if="menuList.length > 0">
          <el-collapse-item  class="collapse-item" :title="menuList[0].fid + ' - ' + menuList[0].fname" name="1" @click.native="handleCategoryClick" :class="{activeStyle: activeWhich == -1}">
            <ul>
              <li v-for="(item,index) in menuForList" :key="index" class="el-icon-document" @click.stop="getList(item.fid, index)" :class="{activeStyle: activeWhich == index}">{{ item.fid }} - {{ item.fname }}</li>
            </ul>
          </el-collapse-item> 
        </el-collapse>
      </div>
      <div class="container-right">
        <el-table height="100%" v-loading="loading" :data="supplierList" @selection-change="handleSelectionChange" class="table" fit>
          <el-table-column type="selection" align="center" />
          <el-table-column label="供应商代码" align="center" prop="fcode" />
          <el-table-column label="客户名称" align="center" prop="fname" />
          <el-table-column label="助记码" align="center" prop="fspell" />
          <el-table-column label="分类" align="center" prop="fcateid" />
          <el-table-column label="联系人" align="center" prop="flinkman" />
          <el-table-column label="电话" align="center" prop="fmoile" />
          <el-table-column label="手机" align="center" prop="fphome" />
          <el-table-column label="是否启用" align="center" prop="fflag" />
        </el-table>
        
        <pagination
          class="y-pagination"
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList(queryParams.fsubcateid, activeWhich)"
        />
      </div>
    </div>

    <!-- 添加或修改供应商对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="客户名称" prop="fname">
          <el-input v-model="form.fname" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="地址" prop="faddress">
          <el-input v-model="form.faddress" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="联系人" prop="flinkman">
          <el-input v-model="form.flinkman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="电话" prop="fphome">
          <el-input v-model="form.fphome" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="手机" prop="fmoile">
          <el-input v-model="form.fmoile" placeholder="请输入手机" />
        </el-form-item>
        <el-form-item label="备注" prop="fmemo">
          <el-input v-model="form.fmemo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="助记码" prop="fspell">
          <el-input v-model="form.fspell" placeholder="请输入助记码" />
        </el-form-item>
        <el-form-item label="对应销售" prop="fsalesman">
          <el-input v-model="form.fsalesman" placeholder="请输入对应销售" />
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
import { listSupplier, getSupplier, delSupplier, addSupplier, updateSupplier, exportSupplier } from "@/api/basic/supplier";
import { listItem as getDictListItem} from "@/api/system/businessDictItem";

export default {
  name: "Supplier",
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
      // 供应商表格数据
      supplierList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        fcode: null,
        fcompanyid: null,
        fname: null,
        faddress: null,
        flinkman: null,
        fphome: null,
        fmoile: null,
        fmemo: null,
        fisprint: null,
        fcredit: null,
        fspell: null,
        fflag: null,
        fsalesman: null,
        fcateid: null,
        fsubcateid: null,
        flasttime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // flasttime: [
        //   { required: true, message: "更新时间不能为空", trigger: "blur" }
        // ]
      },
      activeNames: ['1'],
      activeWhich: -1,
      menuList: [],
      menuForList: []
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    /** 查询供应商列表 */
    getList(fid = null, index = -1) {
      this.loading = true;
      this.queryParams.fsubcateid = fid
      this.activeWhich = index
      listSupplier(this.queryParams).then(response => {
        console.log(response)
        this.supplierList = response.rows;
        for (const key in this.supplierList) {
          if (Object.hasOwnProperty.call(this.supplierList, key)) {
            const element = this.supplierList[key];
            if(element.fflag == 1) {
              element.fflag = '启用'
            }else {
              element.fflag = '未启用'
            }
          }
        }
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询客户分类列表 */
    getCategoryList() {
      getDictListItem({
        pageNum: 1,
        pageSize: 20,
        fsparent: 1003
      }).then(response => {
        this.menuList = response.rows
        this.menuForList = []
        for(let i = 1; i < this.menuList.length; i++) {
          this.menuForList.push(this.menuList[i])
        }
        this.getList(null, this.activeWhich)
      })
    },
    handleCategoryClick() {
      if(this.activeWhich == -1) {
        return
      }
      this.activeWhich = -1
      this.getList(null, this.activeWhich)
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        fcode: null,
        fcompanyid: null,
        fname: null,
        faddress: null,
        flinkman: null,
        fphome: null,
        fmoile: null,
        fmemo: null,
        fisprint: null,
        fcredit: null,
        fspell: null,
        fflag: null,
        fsalesman: null,
        fcateid: null,
        fsubcateid: null,
        flasttime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList(this.queryParams.fsubcateid, this.activeWhich);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.fcode)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加供应商";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const fcode = row.fcode || this.ids
      getSupplier(fcode).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改供应商";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.fcode != null) {
            updateSupplier(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList(this.queryParams.fsubcateid, this.activeWhich);
            });
          } else {
            addSupplier(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList(this.queryParams.fsubcateid, this.activeWhich);
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const fcodes = row.fcode || this.ids;
      this.$confirm('是否确认删除供应商编号为"' + fcodes + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delSupplier(fcodes);
        }).then(() => {
          this.getList(this.queryParams.fsubcateid, this.activeWhich);
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有供应商数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportSupplier(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    },
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
  .d-flex {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: auto;
  }
  .d-none {
    display: none;
  }
  ul {
    margin: 0;
    padding: 5px;
    list-style: none;
  }
  .container-left {
    width: 200px;
    overflow: scroll !important;
    border: #ccc 1px solid;
    padding: 5px;
  }
  .container-left li {
    margin-bottom: 10px;
    font-size: 16px;
    white-space: nowrap;
    padding-right: 10px;
  }
  .container-left li:hover {
    color: #1d8cff;
  }
  .container-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  .table {
    flex: 1;
  }
  .y-pagination {
    height: 50px;
    border: 1px solid #ccc;
  }
  .pagination-container {
    margin: 0;
  }
  .el-icon-document {
    display: inline-flex
  }
  .activeStyle {
    color: #1d8cff;
  }
  .collapse, .collapse >>> .el-collapse-item__header, .collapse >>> .el-collapse-item__wrap {
    border: none !important;
  }
  .collapse >>> .el-collapse-item__header {
    padding-left: 5px;
    font-size: 16px;
  }
  .activeStyle >>> .el-collapse-item__header {
    color: #1d8cff;
  }
  .collapse-item >>> .el-collapse-item__wrap {
    overflow: unset;
  }
</style>