<template>
  <el-container class="outside">
    <el-header>
      <el-button @click="handleClose"><i class="el-icon-circle-close"></i> 关 闭</el-button>
      <el-button @click="handleSearch"><i class="el-icon-search"></i> 查 询</el-button>
      <el-button @click="handleConfirm"><i class="el-icon-circle-check"></i> 确 定</el-button>
    </el-header>
    <el-container class="inside">
        <el-aside width="200px">
          <el-menu :default-openeds="['1']" unique-opened>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>导航一</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                <el-menu-item index="1-4-2">选项4-2</el-menu-item>
                <el-menu-item index="1-4-3">选项4-3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>导航二</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>导航三</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
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
    mdata: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      sdata: this.mdata.filter(v => {
        console.log(JSON.stringify(v))
        return v.id == 1
      })
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
      }
  },
  watch: {
    mdata() {
      console.log("3333333333333333333")
      this.sdata = this.mdata.some(v => {
        console.log(JSON.stringify(v))
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
</style>
