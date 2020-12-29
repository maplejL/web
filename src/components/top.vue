<template>
  <div>
    <div id="page-top">
      <div id="top">
        <div id="top-left">
          <topLeft
            :isLogin="isLogin"
            @change="getIsLogin"
            :isUserLogin="isUserLogin"
            :username="username"
            @log-out="logOut"
          ></topLeft>
        </div>
        <div id="top-right">
          <topRight :username="username"></topRight>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topLeft from './topLeft'
import topRight from './topRight'
export default {
  data () {
    return {
      isLogin: false,
      isUserLogin: 0,
      username: ''
    }
  },
  components: {
    topLeft,
    topRight
  },
  methods: {
    getIsLogin (data) {
      this.isLogin = data
    },
    logOut () {
      this.username = ''
      localStorage.setItem('username', null)
      this.isUserLogin = 0
      this.$router.push({
        name: 'home',
        params: {
          isLogout: 1
        }
      })
    },
    checkUsername () {
      if (this.username === null) {
        return 0
      } else {
        return 1
      }
    }
  },
  created () {
    this.isUserLogin = 0
  },
  mounted () {
    this.username = JSON.parse(localStorage.getItem('username'))
    this.isUserLogin = this.checkUsername()
  }
}
</script>

<style >
#page-top {
  width: 100%;
  height: 50px;
  background-color: lightgray;
}
#top {
  width: 980px;
  height: 50px;
  margin: auto;
}
#top-right {
  height: 50px;
  float: right;
}
#top-left {
  height: 50px;
  float: left;
  margin: auto;
  line-height: 50px;
}
</style>
