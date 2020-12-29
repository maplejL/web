<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="black"
    >
      <el-submenu index="2" >
        <template slot="title" >我的淘宝</template>
        <el-menu-item index="2-1"><i class="el-icon-shopping-cart-full"></i
        ><a @click="toShoppingCart" >购物车</a></el-menu-item>
        <!-- <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu> -->
      </el-submenu>

      <!-- <el-menu-item index="3" :disabled="checkIsLogin() == 0"
        ><i class="el-icon-shopping-cart-full"></i
        ><router-link to="/shoppingCart">购物车</router-link></el-menu-item
      > -->
      <el-menu-item index="4"
        ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['username'],
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    toShoppingCart () {
      if (this.username != null && this.username !== '') {
        console.log(this.username)
        this.$router.push('/shoppingCart')
      } else {
        this.$router.push('/login')
      }
    },
    checkIsLogin () {
      if (
        localStorage.getItem('username') === '' ||
        localStorage.getItem('username') === null
      ) {
        return 0
      }
    }
  }
}
</script>
<style scoped>
/* a{
  text-decoration-line: none;
} */
#top {
  height: 50px;
  float: right;
  background-color: lightgray;
}
.el-menu-demo {
  height: 50px;
  background-color: lightgray;
}
/* .el-menu-demo{

        float: right;
    } */
</style>
