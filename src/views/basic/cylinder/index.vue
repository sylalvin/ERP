<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="商品代码" prop="fcode">
        <el-input
          v-model="queryParams.fcode"
          placeholder="请输入商品代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品名称" prop="fname">
        <el-input
          v-model="queryParams.fname"
          placeholder="请输入商品名称"
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
          v-hasPermi="['basic:cylinder:add']"
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
          v-hasPermi="['basic:cylinder:edit']"
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
          v-hasPermi="['basic:cylinder:remove']"
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
          v-hasPermi="['basic:cylinder:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList(queryParams.fsubcateid, activeWhich)"></right-toolbar>
    </el-row>

    <div class="d-flex">
      <div class="container-left">
        <el-collapse v-model="activeNames" class="collapse" v-if="menuList.length > 0">
          <el-collapse-item  class="collapse-item" :title="menuList[0].fid + ' - ' + menuList[0].fname" name="1" @click.native="handleCategoryClick" :class="{activeStyle: activeWhich == -1}">
            <ul>
              <li v-for="(item,index) in menuForList" :key="index" class="el-icon-document" @click.stop="getList(item.fid, index)" :class="{activeStyle: activeWhich == index}">{{ item.fid }} - {{ item.fvalue }}</li>
            </ul>
          </el-collapse-item> 
        </el-collapse>
      </div>
      <div class="container-right">
        <el-table height="100%" v-loading="loading" :data="cylinderList" @selection-change="handleSelectionChange" class="table" fit>
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="商品代码" align="center" prop="fcode" />
          <el-table-column label="商品名称" align="center" prop="fname" />
          <el-table-column label="助记码" align="center" prop="fspell" />
          <el-table-column label="规格" align="center" prop="fspec" />
          <el-table-column label="单位" align="center" prop="funit" />
          <el-table-column label="分类" align="center" prop="fcateid" />
          <el-table-column label="子分类" align="center" prop="fsubcateid" />
          <el-table-column label="是否启用" align="center" prop="fflag" />
          <el-table-column label="用友存货码" align="center" prop="finum" />
          <el-table-column label="重量" align="center" prop="fnetweight" />
          <el-table-column label="库位货架" align="center" prop="frack" />
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

    <!-- 添加或修改钢瓶档案对话框 -->
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
import { listCylinder, getCylinder, delCylinder, addCylinder, updateCylinder, exportCylinder } from "@/api/basic/cylinder";
import { listDict as getDictList} from "@/api/system/businessDict";
import { listItem as getDictListItem} from "@/api/system/businessDictItem";
import Editor from '@/components/Editor';

export default {
  name: "Cylinder",
  components: {
    Editor,
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
      // 钢瓶档案表格数据
      cylinderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fcode: null,
        fname: null,
        fsubcateid: null
      },
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
        ],
      },
      activeNames: ['1'],
      activeWhich: -1,
      menuList: [],
      menuForList: []
    }
  },
  created() {
    this.getDict();
  },
  methods: {
    /** 查询钢瓶档案列表 */
    getList(fid = null, index = -1) {
      this.loading = true;
      this.queryParams.fsubcateid = fid
      console.log(this.queryParams)
      this.activeWhich = index
      listCylinder(this.queryParams).then(response => {
        this.cylinderList = response.rows;
        for (const key in this.cylinderList) {
          if (Object.hasOwnProperty.call(this.cylinderList, key)) {
            const element = this.cylinderList[key];
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
    /** 查询业务字典分类列表 */
    getDict() {
      getDictList({
        pageNum: 1,
        pageSize: 100,
        fname: null
      }).then(res => {
        this.menuList = []
        for (const value of res.rows) {
          if(value.fid == '2001') {
            this.menuList.push(value)
            this.getCategoryList()
            return
          }
        }
      }).then(this.getCategoryList())
    },
    /** 查询钢瓶档案分类列表 */
    getCategoryList() {
      getDictListItem({
        pageNum: 1,
        pageSize: 100,
        fsparent: 2001
      }).then(response => {
        this.menuForList = []
        for(let i = 0; i < response.rows.length; i++) {
          this.menuForList.push(response.rows[i])
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
        fspell: null,
        fgroupnum: null,
        fspec: null,
        funit: null,
        fcateid: null,
        fsubcateid: null,
        fpurchaseprice: null,
        fsalesprice: null,
        fmemo: null,
        fflag: null,
        fisliquid: null,
        fsubcatename: null,
        fpiecework1: null,
        fpiecework2: null,
        fpiecework3: null,
        fpiecework4: null,
        fpiecework5: null,
        fqty: null,
        finum: null,
        fitaxrate: null,
        fnetweight: null,
        fbottlecode: null,
        fbottleqty: null,
        frack: null
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
      this.title = "添加钢瓶档案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const fcode = row.fcode || this.ids
      getCylinder(fcode).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改钢瓶档案";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.fcode != null) {
            updateCylinder(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList(this.queryParams.fsubcateid, this.activeWhich);
            });
          } else {
            addCylinder(this.form).then(response => {
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
      this.$confirm('是否确认删除钢瓶档案编号为"' + fcodes + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCylinder(fcodes);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有钢瓶档案数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportCylinder(queryParams);
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