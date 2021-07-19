<template>
  <el-container>
    <el-header>{{title}}</el-header>
    <el-container>
        <el-aside width="200px">
          <ul>
            <li v-for="(item, index) in sdata" :key="index">{{item.name}}</li>
          </ul>
        </el-aside>
        <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>

export default {
  name: 'Popup',
  props: {
    title: {
      type: String,
      require: true,
      default: "标题"
    },
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

</style>
