<template>
  <el-menu
    default-active="1-6-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <el-submenu index="1" >
      <template slot="title">
        <b slot="title" id="title">手机 / 数码 / 企业</b>
      </template>
      <div>
      <el-menu-item-group id="expand" v-model="brandFlag">
        <el-menu-item index="1-1" @click="getByBrand(1)">华为</el-menu-item>
        <el-menu-item index="1-2" @click="getByBrand(2)">苹果</el-menu-item>
        <el-menu-item index="1-3" @click="getByBrand(3)">vivo</el-menu-item>
        <el-menu-item index="1-4" @click="getByBrand(4)">三星</el-menu-item>
        <el-menu-item index="1-5" @click="getByBrand(5)">小米</el-menu-item>
      </el-menu-item-group>
      </div>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <b slot="title">电脑/电脑配件</b>
      </template>
      <el-menu-item-group id="expand">
        <el-menu-item index="1-1">联想</el-menu-item>
        <el-menu-item index="1-2">戴尔</el-menu-item>
        <el-menu-item index="1-2">华硕</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <b slot="title">大家电 / 生活电器</b>
      </template>
      <el-menu-item-group id="expand">
        <el-menu-item index="1-1">取暖器</el-menu-item>
        <el-menu-item index="1-2">热水器</el-menu-item>
        <el-menu-item index="1-3">空调</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <b slot="title">男装 / 运动户外</b>
      </template>
      <el-menu-item-group id="expand">
        <el-menu-item index="1-1">棉服</el-menu-item>
        <el-menu-item index="1-2">羽绒服</el-menu-item>
        <el-menu-item index="1-3">毛衣</el-menu-item>
        <el-menu-item index="1-3">衬衫</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <b slot="title">女鞋 / 男鞋 / 箱包</b>
      </template>
      <el-menu-item-group id="expand">
        <el-menu-item index="1-1">口红</el-menu-item>
        <el-menu-item index="1-2">眼影</el-menu-item>
        <el-menu-item index="1-3">睫毛膏</el-menu-item>
        <el-menu-item index="1-3">眉粉</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
        <el-submenu index="6">
      <template slot="title">
        <b slot="title">美妆 / 彩妆 / 个护</b>
      </template>
      <el-menu-item-group id="expand">
        <el-menu-item index="1-1">口红</el-menu-item>
        <el-menu-item index="1-2">眼影</el-menu-item>
        <el-menu-item index="1-3">睫毛膏</el-menu-item>
        <el-menu-item index="1-3">眉粉</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
            <el-submenu index="7">
      <template slot="title">
        <b slot="title">图书影像/文具</b>
      </template>
      <el-menu-item-group id="expand">
        <el-menu-item index="1-1">钢笔</el-menu-item>
        <el-menu-item index="1-2">笔袋</el-menu-item>
        <el-menu-item index="1-3">教辅用材</el-menu-item>
        <el-menu-item index="1-3">台历挂历</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
            <el-submenu index="8">
      <template slot="title">
        <b slot="title">零食 / 生鲜 / 茶酒</b>
      </template>
      <el-menu-item-group id="expand">
        <el-menu-item index="1-1">零食大礼包</el-menu-item>
        <el-menu-item index="1-2">名优白酒</el-menu-item>
        <el-menu-item index="1-3">酸奶</el-menu-item>
        <el-menu-item index="1-3">熟食</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
            <el-submenu index="9">
      <template slot="title">
        <b slot="title">医药保健 / 进口</b>
      </template>
      <el-menu-item-group id="expand">
        <el-menu-item index="1-1">鼻炎</el-menu-item>
        <el-menu-item index="1-2">镇热解痛</el-menu-item>
        <el-menu-item index="1-3">补气补血</el-menu-item>
        <el-menu-item index="1-3">真菌感染</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
el-submenu {
  background-color: lightgrey;
}
#expand {
  margin-top: 0px;
  width: 900px;
  height: 350px;
}
</style>

<script>
export default {
  data () {
    return {
      isCollapse: true,
      msg: '',
      brandFlag: 0
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    getByBrand (brandFlag) {
      if (brandFlag === 1) {
        this.msg = 'huawei'
      } else if (brandFlag === 2) {
        this.msg = 'apple'
      } else if (brandFlag === 3) {
        this.msg = 'vivo'
      } else if (brandFlag === 4) {
        this.msg = 'sansung'
      } else if (brandFlag === 5) {
        this.msg = 'mi'
      }

      this.$router.push({
        name: 'home',
        query: {
          brandname: this.msg
        }
      })
    }
  },
  watch: {
    $router (to, from) {
      this.getByBrand(this.brandFlag)
    }
  }
}
</script>

<style scoped>
</style>
