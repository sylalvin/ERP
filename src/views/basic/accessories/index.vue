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
          v-hasPermi="['basic:accessories:add']"
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
          v-hasPermi="['basic:accessories:edit']"
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
          v-hasPermi="['basic:accessories:remove']"
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
          v-hasPermi="['basic:accessories:export']"
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
        <el-table height="100%" v-loading="loading" :data="accessoriesList" @selection-change="handleSelectionChange" class="table" fit>
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="商品代码" align="center" prop="fcode" />
          <el-table-column label="商品名称" align="center" prop="fname" />
          <el-table-column label="助记码" align="center" prop="fspell" />
          <el-table-column label="规格" align="center" prop="fspec" />
          <el-table-column label="单位" align="center" prop="funit" />
          <el-table-column label="分类" align="center" prop="fcateid" />
          <el-table-column label="子分类" align="center" prop="fsubcateid" />
          <el-table-column label="是否启用" align="center" prop="fflag" />
          <el-table-column label="子分类名称" align="center" prop="fsubcatename" />
          <el-table-column label="用友存货码" align="center" prop="finum" />
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

    <!-- 添加或修改配件档案对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商品名称" prop="fname">
          <el-input v-model="form.fname" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="产品组号" prop="fgroupnum">
          <el-input v-model="form.fgroupnum" placeholder="请输入产品组号" />
        </el-form-item>
        <el-form-item label="规格" prop="fspec">
          <el-input v-model="form.fspec" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="单位" prop="funit">
          <el-input v-model="form.funit" placeholder="请输入单位" />
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
        <el-form-item label="备注" prop="fmemo">
          <el-input v-model="form.fmemo" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="子分类名称" prop="fsubcatename">
          <el-input v-model="form.fsubcatename" placeholder="请输入子分类名称" />
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
import { listAccessories, getAccessories, delAccessories, addAccessories, updateAccessories, exportAccessories } from "@/api/basic/accessories";
import { listDict as getDictList} from "@/api/system/businessDict";
import { listItem as getDictListItem} from "@/api/system/businessDictItem";

export default {
  name: "Accessories",
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
      // 配件档案表格数据
      accessoriesList: [],
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
        ]
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
    /** 查询配件档案列表 */
    getList(fid = null, index = -1) {
      this.loading = true;
      this.queryParams.fsubcateid = fid
      this.activeWhich = index
      listAccessories(this.queryParams).then(response => {
        console.log(response)
        this.accessoriesList = response.rows;
        for (const key in this.accessoriesList) {
          if (Object.hasOwnProperty.call(this.accessoriesList, key)) {
            const element = this.accessoriesList[key];
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
          if(value.fid == '2002') {
            this.menuList.push(value)
            this.getCategoryList()
            return
          }
        }
      })
    },
    /** 查询配件档案分类列表 */
    getCategoryList() {
      getDictListItem({
        pageNum: 1,
        pageSize: 100,
        fsparent: 2002
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
        finum: null,
        fitaxrate: null,
        fnetweight: null
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
      this.title = "添加配件档案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const fcode = row.fcode || this.ids
      getAccessories(fcode).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改配件档案";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.fcode != null) {
            updateAccessories(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList(this.queryParams.fsubcateid, this.activeWhich);
            });
          } else {
            addAccessories(this.form).then(response => {
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
      this.$confirm('是否确认删除配件档案编号为"' + fcodes + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delAccessories(fcodes);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有配件档案数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportAccessories(queryParams);
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