<template>
  <el-container class="outside">
    <el-header>
      <el-button @click="handleClose"><i class="el-icon-circle-close"></i> 关 闭</el-button>
      <el-button @click="handleSearch"><i class="el-icon-search"></i> 查 询</el-button>
      <el-button @click="handleConfirm"><i class="el-icon-circle-check"></i> 确 定</el-button>
    </el-header>
    <el-container class="inside">
        <el-aside>
          <!-- <el-menu :default-openeds="['1']" class="m-menu">
            <el-submenu v-for="(item, index) in productList" :key="index" :index="String(index + 1)">
              <template slot="title"><span class="w-600" :class="index == activeWhich?'activeStyle':''" @click.stop="handleClick(index)">{{item.key}}</span></template>
              <el-submenu v-for="(subitem, subindex) in item.value" :key="subindex" :index="(index + 1) + '-' + (subindex + 1)">
                <template slot="title"><span class="w-500" @click.stop="handleClick(index+'-'+subindex)">{{subitem.fid}}-{{subitem.fname}}</span></template>
                <el-menu-item v-for="(ssubitem, ssubindex) in subitem.childList" :key="ssubindex" :index="(index + 1) + '-' + (subindex + 1) + '-' + (ssubindex + 1)">
                  <template slot="title"><span @click.stop="handleClick(index+'-'+subindex+'-'+ssubindex)">{{ssubitem.fid}}-{{ssubitem.fvalue}}</span></template>
                </el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu> -->
          <el-menu :default-openeds="idsArr" class="m-menu">
            <el-submenu v-for="item in categoryList" :key="item.fid" :index="item.fid">
              <template slot="title"><span class="w-600" :class="{activeStyle: ids[item.fid]}" @click.stop="handleClick(item.fid)">{{item.key}}</span></template>
              <el-submenu v-for="subitem in item.value" :key="subitem.fid" :index="subitem.fid">
                <template slot="title"><span class="w-500" :class="{activeStyle: ids[subitem.fid]}" @click.stop="handleClick(subitem.fid)">{{subitem.fid}}-{{subitem.fname}}</span></template>
                <el-menu-item v-for="ssubitem in subitem.childList" :key="ssubitem.fid" :index="ssubitem.fid">
                  <template slot="title"><span :class="{activeStyle: ids[ssubitem.fid]}" @click.stop="handleClick(ssubitem.fid)">{{ssubitem.fid}}-{{ssubitem.fvalue}}</span></template>
                </el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-form :model="queryParams" ref="queryForm" :inline="true" class="search-form">
            <el-form-item label="助记码" prop="fspell" @input="handleInputFspell">
              <el-input v-model="queryParams.fspell" />
            </el-form-item>
            <el-form-item label="商品代码" prop="fcode" @input="handleInputFcode">
              <el-input v-model="queryParams.fcode" />
            </el-form-item>
            <el-form-item label="商品名称" prop="fname" @input="handleInputFname">
              <el-input v-model="queryParams.fname" />
            </el-form-item>
          </el-form>

          <el-table height="100%" v-loading="loading" :data="productList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="商品代码" align="center" prop="fcode" />
            <el-table-column label="商品名称" align="center" prop="fname" />
            <el-table-column label="助记码" align="center" prop="fspell" />
            <el-table-column label="规格" align="center" prop="fbspec" />
            <el-table-column label="单位" align="center" prop="fcateid" />
            <el-table-column label="是否启用" align="center" prop="fflag" />
          </el-table>
            
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getProductList"
          />
        </el-main>
    </el-container>
  </el-container>
</template>
<script>

export default {
  name: 'Popup',
  props: {
    categoryList: { // 分类列表
      type: Array,
      require: true
    },
  },
  data() {
    return {
      queryParams: {
        fid: null,
        pageSize: 10,
        pageNum: 1,
        fname: '', // 商品名称
        fcode: '', // 商品代码
        fspell: '' // 助记码
      },
      ids: {},
      idsArr: [],
      productList: [
        { fcode: 1, fname: 2, fspell: 3, fbspec: 4, fcateid: 5, fflag:6 },
        { fcode: 1, fname: 2, fspell: 3, fbspec: 4, fcateid: 5, fflag:6 },
        { fcode: 1, fname: 2, fspell: 3, fbspec: 4, fcateid: 5, fflag:6 },
        { fcode: 1, fname: 2, fspell: 3, fbspec: 4, fcateid: 5, fflag:6 },
        { fcode: 1, fname: 2, fspell: 3, fbspec: 4, fcateid: 5, fflag:6 }
      ],
      loading: false,
      total: 5
    }
  },
  created() {
    let ids = {}
    if(this.categoryList.length > 0) {
      for(let i = 0; i < this.categoryList.length; i++) {
        ids[this.categoryList[i].fid] = true
        if(this.categoryList[i].value.length > 0) {
          for(let j = 0; j < this.categoryList[i].value.length; j++) {
            ids[this.categoryList[i].value[j].fid] = false
            if(this.categoryList[i].value[j].childList.length > 0) {
              for(let k = 0; k < this.categoryList[i].value[j].childList.length; k++) {
                ids[this.categoryList[i].value[j].childList[k].fid] = false
              }
            }
          }
        }
      }
    }
    let idsArr = []
    for(let v in ids) {
      idsArr.push(v)
    }
    this.$set(this.$data, 'ids', ids)
    this.$set(this.$data, 'idsArr', idsArr)
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleSearch() {
      this.$emit('search')
    },
    handleConfirm() {
      this.$emit('confirm')
    },
    handleClick(val) {
      for(let x in this.ids) {
        if(val == x) {
          this.ids[x] = true
        }else {
          this.ids[x] = false
        }
      }
      if(val != '0000') {
        this.queryParams.fid = val
      }
      this.getProductList()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // this.ids = selection.map(item => item.keyid)
      console.log("selection===" + JSON.stringify(selection))
      this.$emit('sendProductData', selection)
    },
    handleInputFspell() {
      // 通过输入助记码查询商品
      this.getProductList()
    },
    handleInputFcode() {
      // 通过输入商品代码查询商品
      this.getProductList()
    },
    handleInputFname() {
      // 通过输入商品名称查询商品
      this.getProductList()
    },
    getProductList() {
      this.$emit('getProductData', this.queryParams)
    }
  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>
  .outside {
    height: 100%;
  }
  .inside {
    height: calc(100% - 60px);
  }
  ::v-deep .el-menu {
    border: none;
    background: none;
  }
  aside, footer, main {
    background: #eef1f6;
  }
  header {
    margin-bottom: 5px;
    padding: 0 10px;
    line-height: 66px;
    background: #e2e2e2;
  }
  header > button {
    font-size: 18px;
    font-weight: 600;
  }
  aside {
    margin-right: 5px;
    height: 100%;
    width: auto !important;
    min-width: 200px;
    padding: 5px;
  }
  ::v-deep .el-menu{
    padding-left: 10px;
  }
  ::v-deep .el-main{
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  ::v-deep .el-table{
    flex: 1;
  }
  ::v-deep .el-submenu__title {
    height: 24px;
    line-height: inherit;
    padding: 0 !important;
  }
  ::v-deep .el-submenu .el-menu-item {
    height: 24px;
    line-height: inherit;
    padding: 0 !important;
  }
  main {
    height: 100%;
  }
  .el-icon-circle-close {
    color: #f00;
  }
  .el-icon-search {
    color: blue;
  }
  .el-icon-circle-check {
    color: green;
  }
  .m-menu >>> .el-submenu {
    overflow: inherit;
  }
  .w-600 {
    font-weight: 600;
  }
  .w-500 {
    font-weight: 500;
  }
  .activeStyle {
    color: #1d8cff !important;
  }
  ::v-deep .el-submenu__icon-arrow {
    margin-top: 0px !important;
  }
  ::v-deep .el-menu-item.is-active {
    color: #303133;
  }
  ::v-deep .pagination-container {
    margin: 0 17px 0 0 !important;
    padding: 0 16px !important;
    height: 32px;
  }
</style>
