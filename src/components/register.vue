
<template>
  <div>
    <div class="register-top">
      <a href="#">
        <el-image :src="url" @click="send"></el-image>
      </a>
    </div>
    <div id="register-middle" :style="registerMiddle">
      <div id="register-module">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name"
            ><el-input v-model="ruleForm.name"></el-input
          ></el-form-item>
          <el-form-item label="密码" prop="pass"
            ><el-input
              type="password"
              v-model="ruleForm.pass"
              auto-complete="off"
            ></el-input
          ></el-form-item>
          <el-form-item label="确认密码" prop="checkPass"
            ><el-input
              type="password"
              v-model="ruleForm.checkPass"
              auto-complete="off"
            ></el-input
          ></el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >注册</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="bottom">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from './footer.vue'
export default {
  components: { Footer },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      activeName: 'second',
      url: '/static/login_top_logo.jpg',
      ruleForm: {
        name: '',
        pass: '',
        checkPass: ''
      },
      registerMiddle: {
        width: '100%',
        height: '600px',
        backgroundImage:
          'url(' + require('../../static/middle_background_img.jpg') + ')'
      },
      rules: {
        name: [
          { required: true, message: '请输入您的名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      timer: 0
    }
  },

  methods: {
    send () {
      this.$router.push({
        name: 'home'
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.get('/api/home/getlist', {}).then((response) => {
            var uid = response.data.length + 1
            this.$axios
              .get('/api/home/setUser', {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: {
                  uid: uid,
                  username: this.ruleForm.name,
                  password: this.ruleForm.pass
                }
              })
              .then((res) => {
                this.$alert('注册成功,即将跳转到登录页面!')
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                  this.$router.push('/login')
                }, 2000)
              })
          })
          // this.activeName: 'first',
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
#register-module {
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
.register-top {
  width: 980px;
  height: 100px;
  margin: auto;
}
.register-middle {
  width: 100%;
  height: 600px;
}
</style>
