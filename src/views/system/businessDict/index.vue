<template>
  <div class="app-container">
    <el-form class="d-none" :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="业务名称" prop="fname">
        <el-input
          v-model="queryParams.fname"
          placeholder="请输入业务名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['system:businessDict:add']"
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
          v-hasPermi="['system:businessDict:edit']"
        >编辑</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:businessDict:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-open"
          size="mini"
          :disabled="single"
          @click="handleOnOff"
          v-hasPermi="['system:businessDict:edit']"
        >启/禁</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-close"
          size="mini"
          @click="handleClose"
        >关闭</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <div class="d-flex">
      <ul class="container-left">
        <li v-for="(item,index) in dictList" :key="index" @click="getListItem(item.fid, index)" class="el-icon-document" :class="{activeStyle : activeWhich == index}">{{ item.fid }} - {{ item.fname }}</li>
      </ul>
      
      <div class="container-right">
        <el-table height="100%" v-loading="loadingItem" :data="dictListItem" @selection-change="handleSelectionChange" class="table">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="代码" align="center" prop="fid" sortable />
          <el-table-column label="名称" align="center" prop="fname" sortable />
          <el-table-column label="FKey" align="center" prop="fkey" sortable />
          <el-table-column label="FValue" align="center" prop="fvalue" sortable />
          <el-table-column label="状态" align="center" prop="fflag" sortable />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template v-slot="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:businessDict:edit']"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['system:businessDict:remove']"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          class="y-pagination"
          v-show="totalItem>0"
          :total="totalItem"
          :page.sync="queryItemParams.pageNum"
          :limit.sync="queryItemParams.pageSize"
          @pagination="getListItem(queryItemParams.fsparent, activeWhich)"
        />
      </div>
    </div>

    <!-- 添加或修改业务字典对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="代码" prop="fid">
          <el-input v-model="form.fid" placeholder="请输入代码" />
        </el-form-item>
        <el-form-item label="名称" prop="fname">
          <el-input v-model="form.fname" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="键" prop="fkey">
          <el-input v-model="form.fkey" placeholder="请输入键" />
        </el-form-item>
        <el-form-item label="值" prop="fvalue">
          <el-input v-model="form.fvalue" placeholder="请输入值" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" class="el-icon-circle-close"> 关 闭</el-button>
        <el-button type="primary" @click="submitForm" class="el-icon-circle-check"> 提交表单</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDict, getDict, delDict, addDict, updateDict, exportDict } from "@/api/system/businessDict";
import { listItem, getItem, delItem, addItem, updateItem, exportItem } from "@/api/system/businessDictItem";

export default {
  name: "Dict",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 分类下遮罩层
      loadingItem: true,
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
      // 列表总条数
      totalItem: 0,
      // 业务字典表格数据
      dictList: [],
      // 业务字典分类下的列表信息数据
      dictListItem: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询分类参数
      queryParams: {
        pageNum: 1,
        pageSize: 100,
        fname: null
      },
      // 查询分类下内容参数
      queryItemParams: {
        pageNum: 1,
        pageSize: 10,
        fsparent: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        fid: [
          { required: true, message: "代码不能为空", trigger: "blur" }
        ],
        fname: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ]
      },
      activeWhich: 0,
      mode: 'add', // 修改方式add or update
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询业务字典列表 */
    getList() {
      listDict(this.queryParams).then(response => {
        this.dictList = response.rows;
        if(response.rows.length > 0) {
          this.getListItem(response.rows[0].fid, this.activeWhich)
        }
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询业务字典列表分类内容 */
    getListItem(id, index) {
      this.queryItemParams.fsparent = id
      this.activeWhich = index
      // console.log(JSON.stringify(this.queryItemParams))
      this.loading = true;
      listItem(this.queryItemParams).then(response1 => {
        console.log(JSON.stringify(response1.rows))
        this.dictListItem = response1.rows
        for (const key in this.dictListItem) {
          if (Object.hasOwnProperty.call(this.dictListItem, key)) {
            const element = this.dictListItem[key];
            console.log(JSON.stringify(element))
            if(element.fflag == 1) {
              element.fflag = '启用'
            }else {
              element.fflag = '未启用'
            }
          }
        }
        this.totalItem = response1.total
        this.loadingItem = false
      })
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
        fname: null,
        fkey: null,
        fvalue: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryItemParams.pageNum = 1;
      this.getListItem(this.queryItemParams.fsparent, this.activeWhich);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log(selection)
      this.ids = selection.map(item => item.fid)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.mode = 'add'
      this.reset();
      this.open = true;
      this.title = "添加业务字典";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.mode = 'update'
      this.reset();
      const fid = row.fid || this.ids
      getItem(fid).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改业务字典";
      });
    },
    /** 提交按钮 */
    submitForm() {
      console.log(this);
      // return;
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log(valid)
          console.log(this)
          console.log(this.form)
          // return
          // if (this.form.fid != null) {
          if (this.mode == 'update') {
            updateItem(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getListItem(this.queryItemParams.fsparent, this.activeWhich)
            });
          } else if (this.mode == 'add') {
            this.form.fparentid = this.form.fsparent = this.queryItemParams.fsparent
            addItem(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getListItem(this.queryItemParams.fsparent, this.activeWhich)
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const fids = row.fid || this.ids;
      this.$confirm('是否确认删除业务字典编号为"' + fids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delItem(fids);
        }).then(() => {
          this.getListItem(this.queryItemParams.fsparent, this.activeWhich);
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryItemParams = this.queryItemParams;
      this.$confirm('是否确认导出所有业务字典数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportItem(queryItemParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    },
    /** 启禁按钮操作 */
    handleOnOff(row) {
      console.log("启禁功能")
    },
    /** 关闭按钮操作 */
    handleClose(visitedViews) {
      console.log(this.$store.state.tagsView)
      console.log(this.$router.currentRoute.name)
      var visitedViews = this.$store.state.tagsView.visitedViews;
      var name = this.$router.currentRoute.name;
      for(let i = visitedViews.length-1; i >= 0; i--) {
        if(visitedViews[i].name == name) {
          visitedViews.splice(i, 1)
        }
      }
    }
  },
  computed: {
    visitedViews() {
      console.log(this.$store.state.tagsView.visitedViews)
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
    border: solid 1px #ccc;
  }
  .container-left {
    width: auto;
    min-width: 200px;
    overflow: scroll !important;
  }
  .container-left li {
    margin-bottom: 10px;
    font-size: 16px;
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
    display: inherit
  }
  .activeStyle {
    color: #1d8cff;
  }
</style>
