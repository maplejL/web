<template>
  <div>
    <div class="login-top">
      <a href="#">
        <el-image :src="url" @click="send"></el-image>
      </a>
    </div>
    <div class="loginMiddle" :style="loginMiddle">
      <div id="login-module">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名">
            <el-input type="text" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-bottom">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from './footer'
export default {
  props: ['isLogin'],
  components: {
    Footer
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }
      callback()
    }
    return {
      url: '/static/login_top_logo.jpg',
      loginMiddle: {
        width: '100%',
        height: '600px',
        backgroundImage:
          'url(' + require('../../static/middle_background_img.jpg') + ')'
      },

      ruleForm: {
        username: '',
        pass: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        username: [{ validator: validateUsername, trigger: 'blur' }]
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var flag = 1
          this.$axios
            .get('/api/home/getlist', {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
            .then((res) => {
              for (var i = 0; i < res.data.length; i++) {
                if (
                  this.ruleForm.username === res.data[i].username &&
                  this.ruleForm.pass === res.data[i].psd
                ) {
                  localStorage.setItem(
                    'username',
                    JSON.stringify(this.ruleForm.username)
                  )

                  if (this.$route.params.isback === 1) {
                    this.$router.push({
                      name: 'home',
                      params: {

                        isback: 1
                      }
                    })
                  } else {
                    this.$router.push({
                      name: 'home',
                      params: {
                        username: this.ruleForm.username
                      }
                    })
                  }
                  flag = 0
                }
              }
              if (flag === 1) {
                this.$alert('当前用户名未注册', '登陆失败', {
                  dangerouslyUseHTMLString: true
                }).then((action) => {})
              }
            })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.ruleForm.username = ''
      this.$refs[formName].resetFields()
    },
    send () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
#login-module {
  width: 400px;
  height: auto;
  background-color: #fff;
  text-align: center;
  padding-top: 40px;
  padding-right: 40px;
  padding-bottom: 20px;
  position: absolute;
  top: 200px;
  right: 100px;
}
.login-top {
  width: 980px;
  height: 100px;
  margin: auto;
}
.login-middle {
  width: 100%;
  height: 600px;
}
</style>
