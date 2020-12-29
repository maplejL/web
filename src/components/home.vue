<template>
  <div>
    <top
      :isLogin="isLogin"
      :isUserLogin="isUserLogin"
      :username="username"
    ></top>

    <router-view v-show="showDetails == 1"></router-view>

    <div id="second-module">
      <el-header height="200px"
        ><search @getSearchInput="getSearchInput"></search
      ></el-header>
    </div>
    <div id="background">
      <div id="main" v-show="showDetails == 0">
        <div id="third-module-top">
          <table>
            <a href="#">
              <tr width="1200px">
                <td id="third-module-top-1">主题市场</td>
                <td width="70px">天猫</td>
                <td width="70px">聚划算</td>
                <td width="70px">天猫超市</td>
                <td width="70px">司法拍卖</td>
                <td width="70px">淘宝精选</td>
                <td width="70px">智能生活</td>
              </tr>
            </a>
          </table>
        </div>
        <div id="third-module">
          <div id="third-module-middle">
            <navigationSide
              @get-brand="getBrand"
              id="navigationSide"
            ></navigationSide>
            <div id="carousel">
            <Carousel id="carousel1"></Carousel>
            <Carousel-2 id="carousel2"></Carousel-2>
            </div>
            <div id="remai">
              <el-image :src="adUrl" id="adimg"> </el-image>
              <el-image :src="remaiUrl" id="remaiImg"> </el-image>
            </div>
          </div>
          <div id="third-module-right">
            <div id="third-module-right-1">
              <img :src="userImg" id="userimg" />
              <p v-if="username !== null" id="userSta">
                hi&nbsp;&nbsp;,&nbsp;&nbsp;{{ username }}
              </p>
              <p v-else id="userSta">请登录</p>
              <table align="center">
                <tr>
                  <a href="#"><td>待付款(0)</td></a>
                  <a href="#"><td>待发货(0)</td></a>
                  <a href="#"><td>待收获(0)</td></a>
                </tr>
              </table>
            </div>
            <div id="third-module-right-2">
              <img :src="userImgAdimg" id="userImgAdimg" />
            </div>
            <div id="third_module_right_3">
              <el-tabs v-model="activeName">
                <el-tab-pane label="公告" name="first"
                  ><a href="#"
                    ><b>关于开展打击网络“有偿删帖”和“软色情”专项</b></a
                  ></el-tab-pane
                >
                <el-tab-pane label="安全" name="second"
                  ><a href="#"
                    ><b
                      >魔豆妈妈公益项目&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;让母爱永不打烊！</b
                    ></a
                  ></el-tab-pane
                >
                <el-tab-pane label="规则" name="third"
                  ><a href="#"
                    ><b>新增《淘宝网汽配行业管理规范》</b></a
                  ></el-tab-pane
                >
                <el-tab-pane label="论坛" name="fourth"
                  ><a href="#"
                    ><b
                      >淘宝618大促报名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金牌卖家志愿者招募</b
                    ></a
                  ></el-tab-pane
                >
              </el-tabs>
            </div>
            <div id="third_module_right_4">
              <img
                :src="thirdModuleRightBottomUrl"
                id="thirdModuleRightBottom"
              />
            </div>
          </div>
        </div>
        <div id="fourth-module">
          <div id="fourth-module-top">
            <img :src="fourthModuleTopUrl" id="fourthModuleTop" />
            <p id="fourthModuleTop-p">与品质生活不期而遇</p>
          </div>
          <div id="fourth-module-content">
            <table>
              <tr>
                <a href="#">
                  <td>
                    <img :src="fourthModuleImg1" />
                    <h4>大豆家 方头奶奶鞋<br/><br/></h4><p>一脚蹬设计，方便日常的</p>
                  </td>
                </a>
                <a href="#">
                  <td>
                    <img :src="fourthModuleImg2" />
                    <h4>佳宝路转角水槽<br/><br/></h4><p>304不锈钢，表面光洁坚固</p>
                  </td>
                </a>
                <a href="#">
                  <td>
                    <img :src="fourthModuleImg3" />
                    <h4>肖优秀真皮细高跟过膝<br/><br/></h4><p>细跟尖头设计更显优雅女</p>
                  </td
                ></a>
                <a href="#">
                  <td>
                    <img :src="fourthModuleImg4" />
                    <h4>LANCOME秋冬限量迷雾<br><br></h4><p>雾面质感暗红色管身，优</p>
                  </td>
                </a>
                <a href="#">
                  <td>
                    <img :src="fourthModuleImg5" />
                    <h4>汽车盲点变道辅助系<br><br></h4><p>行车安全盲区监测系统</p>
                  </td>
                </a>
              </tr>
            </table>
          </div>
        </div>
        <div id="fifth-module">
          <div id="products" v-show="showDetails == 0">
            <!-- <b><p>热卖单品</p></b> -->
            <product
              :brandMsg="brandMsg"
              @get-showDetails="getShowDetails"
              :inputSearch="inputSearch"
              :isLogout="isLogout"
            ></product>
          </div>
        </div>
        <!-- <div id="pagination" v-show="showDetails == 0">
          <pagination :proNumber="proNumber"></pagination>
        </div> -->
      </div>
    </div>
    <div id="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import navigationSide from '@/components/navigationSide'
import search from '@/components/search'
import product from '@/components/product'
import Pagination from '@/components/pagination.vue'
import carousel from '@/components/carousel.vue'
import login from './login'
import top from './top.vue'
import Footer from './footer.vue'
import Carousel from './carousel.vue'
import Carousel2 from './carousel2.vue'
export default {
  name: 'App',

  data () {
    return {
      activeName: 'first',
      isLogin: false,
      isRegister: false,
      username: '',
      refresh: true,
      proNumber: 0,
      res: null,
      brandMsg: '',
      isUserLogin: 0,
      showDetails: 0,
      product: {},
      inputSearch: '',
      isLogout: 0,
      remaiUrl: '/static/product(1).webp',
      adUrl: '/static/third_module_right.webp',
      userImg: '/static/user.jpg',
      userImgAdimg: '/static/third_module_right_2.jpg',
      thirdModuleRightBottomUrl: '/static/third_module_right_4.png',
      fourthModuleTopUrl: '/static/fourth_module_top.png',
      fourthModuleImg1: '/static/fourth_module(1).jpg',
      fourthModuleImg2: '/static/fourth_module(2).jpg',
      fourthModuleImg3: '/static/fourth_module(3).jpg',
      fourthModuleImg4: '/static/fourth_module(4).jpg',
      fourthModuleImg5: '/static/fourth_module(5).jpg'
    }
  },
  components: {
    navigationSide,
    search,
    product,

    Pagination,
    carousel,
    login,

    top,
    Footer,
    Carousel,
    Carousel2
  },
  methods: {
    checkIsLogin () {
      console.log(this.isLogin)
      if (this.$route.params.isLogin !== '') {
        this.isLogin = this.$route.params.isLogin
      }

      if (this.isLogin === false) {
        return 0
      } else {
        return 1
      }
    },
    getShowDetails (showDetails) {
      this.showDetails = showDetails
    },
    checkIsRegister () {
      if (this.isRegister === false) {
        return 0
      } else {
        return 1
      }
    },

    getIsLogin (data) {
      this.isLogin = data
    },
    changeLoginSta () {
      this.username = localStorage.getItem('username')
    },
    ReFresh () {
      this.reFresh = false
      this.$nextTick(() => {
        this.reFresh = true
      })
    },
    getBrand (msg) {
      this.brandMsg = msg
    },
    getList () {
      this.$axios.get('/api/home/getlist', {}).then((response) => {
        console.log(response)
      })
    },
    getProducts () {
      this.$axios
        .get('/api/products/getlist', {
          headers: {
            'middle-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((response) => {
          this.proNumber = response.data.length
        })
    },
    getSearchInput (data) {
      this.inputSearch = data
    }
  },
  // created () {
  //   this.getProducts()
  //   console.log(this.proNumber)
  // },
  created () {
    this.getProducts()
  },
  mounted () {
    console.log(this.proNumber)
    this.getSearchInput()
    this.username = JSON.parse(localStorage.getItem('username'))
  },
  watch: {
    $route (to, from) {
      this.username = JSON.parse(localStorage.getItem('username'))

      this.isUserLogin = 1
      this.brandMsg = this.$route.query.brandname
      this.inputSearch = this.$route.query.inputSearch
      console.log(this.inputSearch)
      this.isLogout = this.$route.params.isLogout
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
  color: black;
}
b {
  font-size: 10px;
  position: relative;
  top: -5px;
}
#carousel{
  display: inline-block;
}
#fifth-module p{
  position: relative;
  top: 10px;
  left: 10px;
  font-size: 20px;
  color: red;
}
#fourth-module-top {
  margin-top: 20px;
}
#fourthModuleTop {
  width: 50px;
  height: 30px;
  margin-top: 30px;
  margin-left: 20px;
  display: inline-block;
}
#fourth-module-content img {
  width: 200px;
  height: 200px;
  margin-left: 20px;
}
#fourth-module-content p {
  width: 200px;
  margin-left: 20px;
  color: #999;
}
#fourth-module-content h4{
    margin-top: 5px;
    margin-left: 20px;
    font-size: 16px;
    height: 28px;
    overflow: hidden;
    line-height: 28px;
    font-weight: normal;
}
#fourthModuleTop-p {
  text-align: center;
  display: inline-block;
  position: relative;
  top: -5px;
  left: 10px;
}
#fourth-module {
  width: 1200px;
  height: auto;
  background-color: white;
}
#fourthModuleTop {
  font-size: 40px;
  color: rgb(0, 81, 255);
}
#userSta {
  text-align: center;
}
#thirdModuleRightBottom {
  width: 300px;
  height: 210px;
  margin-top: 15px;
}
#userImgAdimg {
  width: 300px;
  height: 100px;
  border: 0px;
}
#userimg {
  width: 50px;
  height: 50px;
  position: relative;
  left: 40%;
}
#third-module-right {
  background-color: white;
  height: 500px;
  width: 280px;
  display: inline-block;
  position: absolute;
}
#third-module-right-1 {
  width: 300px;
  height: 150px;
}
#third-module-right-3 {
  width: 300px;
  height: 100px;
}
#main {
  width: 1200px;
  height: auto;
  margin: auto;
  margin-top: 20px;
}
#adimg {
  height: 310px;
  position: relative;
  top: -10px;
}
#carousel2 {
  width: 500px;
  height: 50px;
  position: relative;
  left: 30px;
  margin-top: -170px;
}
#third-module-top-1 {
  width: 150px;
  height: 30px;
  background-color: #ff5000;
}
#third-module-top {
  width: 1200px;
  height: 30px;
  background-color: #ff9100;
  text-align: center;
}
#third-module-middle {
  width: 900px;
  height: 550px;
  margin-left: 0px;
  margin-top: 20px;
  background-color: #f4f4f4;
  display: inline-block;
}
#page-top {
  width: 100%;
  height: 50px;
  background-color: lightgray;
}
#background {
  margin: auto;

  background-color: #f4f4f4;
}
#top {
  width: 980px;
  height: 50px;
  margin: auto;
}
#footer{
  background-color: #f4f4f4;
}
#top-right {
  height: 50px;
  float: right;
}
#remai {
  display: inline-block;
  width: 150px;
  height: 200px;
  position: relative;
  left: 40px;
}
#remaiImg {
  height: 150px;
  position: relative;
}
#carousel1 {
  width: 500px;
  height: 250px;
  display: inline-block;
  position: relative;
  left: 30px;
  top: -180px;
}
#top-left {
  height: 50px;
  float: left;
  margin: auto;
  line-height: 50px;
}
#second-module {
  width: 1200px;
  height: auto;
  margin: auto;
  margin-top: 20px;
}
#navigationSide {
  width: 150px;
  display: inline-block;
}
#third-module {
  width: 1200px;
  height: 550px;
  background-color: white;
  display: inline-block;
  border-color: #ff5000;
  border-width: 2px;
}

#fifth-module {
  padding-top: 50px;
}
#products {
  width: 1200px;
  margin: auto;

  background-color: white;
}
#pagination {
  padding-top: 30px;
  width: 200px;
  margin: auto;
}
</style>
