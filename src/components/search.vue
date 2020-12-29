<template>
  <el-row :gutter="20">
    <el-col :span="6"
      ><div class="grid-content bg-purple">
        <el-image :src="urlLeft" :inline="true"></el-image></div
    ></el-col>
    <el-col :span="8" :push="2"
      ><div class="grid-content bg-purple" id="searchInput">
        <!-- <div>
          <input placeholder="请输入您要搜索的内容" v-model="inputSearch" class="input" />

          <el-button class="primary" @click="getProBySearch">搜索</el-button>
        </div> -->
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="inputSearch" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getProBySearch"></el-button>
          </el-input>
        </div>
      </div></el-col
    >
    <el-col :span="9" :push="4"
      ><div class="grid-content bg-purple" id="second-module-right">
        <el-image :src="urlRight" :inline="true"></el-image></div
    ></el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      urlLeft: '/static/second-module-left.gif',
      urlRight: '/static/second-module-right.png',
      inputSearch: ''
    }
  },
  methods: {
    getProBySearch () {
      this.$router.push({
        name: 'home',
        query: {
          inputSearch: this.inputSearch
        }
      })
    }
  }
}
</script>
<style scoped>
#prependIcon{
  background-color: white;
}
.input-with-select{
  margin-left: -100px;
  width: 400px;
}
.primary {
  display: inline-block;
}
.input {
  width: 300px;
  height: 35px;
  display: inline-block;
  border-radius:9px;
  border: 1px solid lightgray;
  margin-left: -50px;
}
#searchInput {
  margin-top: 80px;
  display: inline-block;
}
#second-module-right {
  margin-top: 40px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
