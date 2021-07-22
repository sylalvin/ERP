<template>
  <el-container class="outside">
    <el-header>
      <el-button @click="handleClose"><i class="el-icon-circle-close"></i> 关 闭</el-button>
      <el-button @click="handleSearch"><i class="el-icon-search"></i> 查 询</el-button>
      <el-button @click="handleConfirm"><i class="el-icon-circle-check"></i> 确 定</el-button>
    </el-header>
    <el-container class="inside">
        <el-aside>
          <el-menu :default-openeds="['1']" class="m-menu">
            <el-submenu v-for="(item, index) in productList" :key="index" :index="String(index + 1)">
              <template slot="title"><span class="w-600" :class="{'activeStyle': activeWhich == index}" @click.stop="handleClick(index)">{{item.key}}</span></template>
              <el-submenu v-for="(subitem, subindex) in item.value" :key="subindex" :index="(index + 1) + '-' + (subindex + 1)">
                <template slot="title"><span class="w-500" :class="{'activeStyle': activeWhich == (index + '-' + subindex)}" @click.stop="handleClick(index+'-'+subindex)">{{subitem.fid}}-{{subitem.fname}}</span></template>
                <el-menu-item v-for="(ssubitem, ssubindex) in subitem.childList" :key="ssubindex" :index="(index + 1) + '-' + (subindex + 1) + '-' + (ssubindex + 1)">
                  <template slot="title"><span :class="{'activeStyle': activeWhich == (index + '-' + subindex + '-' + ssubindex)}" @click.stop="handleClick(index+'-'+subindex+'-'+ssubindex)">{{ssubitem.fid}}-{{ssubitem.fvalue}}</span></template>
                </el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>

export default {
  name: 'Popup',
  props: {
    // title: {
    //   type: String,
    //   require: true,
    //   default: "标题"
    // },
    productList: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      queryParams: {},
      activeWhich: ''
    }
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
        console.log(val)
        this.activeWhich = val
      }
  },
  watch: {
    mdata() {
      console.log("3333333333333333333")
      this.sdata = this.mdata.some(v => {
        // console.log(JSON.stringify(v))
        return v.id == 1
      })
    }
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
</style>
