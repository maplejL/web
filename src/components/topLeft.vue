<template>
  <div>
    <a href="#" id="icon"> <i class="el-icon-s-home" @click="toHome">天猫首页</i>&nbsp;&nbsp; </a>
    <span v-show="isUserLogin == 0 || username == 'null'">
      <a href="#"><router-link to="/login">请登录</router-link></a
      >&nbsp;&nbsp;

      <a href="#"><router-link to="/register">免费注册</router-link></a>
    </span>
    <span v-show="isUserLogin == 1 && username !== 'null'"
      >欢迎您,&nbsp;&nbsp;{{ username
      }}<a href="#" @click="logOut">&nbsp;&nbsp;退出</a></span
    >
  </div>
</template>

<script>
export default {
  props: ['isUserLogin', 'username'],
  data () {
    return {}
  },
  methods: {
    logOut () {
      this.$emit('log-out')
    },
    toHome () {
      this.$router.push('/home')
    }
  },
  mounted () {},
  watch: {
    $route (to, from) {
      // if(this.username!=''){
      //   this.isUserLogin=1
      // }
      // console.log(this.isUserLogin)
    }
  }
}
</script>

<style scoped>
a {
  color: red;
}
#icon{
  color: black;
}
</style>
