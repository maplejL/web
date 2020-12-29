<template>
  <div id="background">
    <top id="top"></top>
    <div id="details-second-module">
      <img :src="secondModuleImg" id="second-module-img" />
    </div>
    <div>
      <div id="main">
        <div id="middle-left">
          <div>
            <img :src="url" />
          </div>
          <div id="middle-left-small">
            <a href="#" @click="changeUrl1"
              ><img
                id="middle-left-small"
                :src="this.$route.query.product.url1"
            /></a>
            <a href="#" @click="changeUrl2"
              ><img
                id="middle-left-small"
                :src="this.$route.query.product.url2"
            /></a>
            <a href="#" @click="changeUrl3"
              ><img
                id="middle-left-small"
                :src="this.$route.query.product.url3"
            /></a>
            <a href="#" @click="changeUrl4"
              ><img
                id="middle-left-small"
                :src="this.$route.query.product.url4"
            /></a>
          </div>
        </div>
        <div id="middle-right">
          <div id="introduction" :style="introduction">
            <p>{{ this.$route.query.product.introduction }}</p>
          </div>
          <div id="price">
            <p>价格: &nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p id="price-style">￥{{ this.$route.query.product.price }}</p>
          </div>
          <table id="details">
            <tr>
              <td width="50px" id="head">运费</td>
              <td>
                江苏南京至 南京玄武区 梅园新村街道 快递 0.00
                现在下单，预计12月24日送达
              </td>
            </tr>
            <tr>
              <td id="head">机身颜色</td>
              <td>
                <a href="#" id="details-button">极光蓝</a>
                <a href="#" id="details-button">星河银</a>
                <a href="#" id="details-button">月夜黑</a>
              </td>
            </tr>
            <tr>
              <td id="head">套餐类型</td>
              <td>
                <a href="#" id="details-button">官方标配</a>
              </td>
            </tr>
            <tr>
              <td id="head">存储容量</td>
              <td>
                <a href="#" id="details-button">8+128GB</a>
              </td>
            </tr>
            <tr>
              <td id="head">发行地区</td>
              <td>
                <a href="#" id="details-button">中国大陆</a>
              </td>
            </tr>
          </table>
          <!-- <div id="sell-address">
            <br />
            <p>
              运费: &nbsp;&nbsp;&nbsp;&nbsp;江苏南京至 南京玄武区 梅园新村街道
              快递 0.00 现在下单，预计12月24日送达
            </p>
          </div> -->
          <div id="middle-right-bottom">
            <el-button type="danger" @click="toCart">立即购买</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="danger" @click="addToCart"
              ><i class="el-icon-shopping-cart-full"></i
              >&nbsp;&nbsp;&nbsp;&nbsp;加入购物车</el-button
            >
          </div>
        </div>
      </div>
      <pl :username="username"></pl>
    </div>
    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from './footer.vue'
import top from './top.vue'
import pl from './pl'
import search from './search'
export default {
  components: { top, Footer, pl, search },

  data () {
    return {
      cartPros: [],
      username: '',
      flag: 0,
      url: '',
      jifen: 0,
      secondModuleImg: '/static/details-second-module-img.png',
      introduction: {
        width: '500px',
        height: '50px',
        backgroundImage:
          'url(' + require('../../static/detail-middle-right(1).png') + ')'
      }
    }
  },
  methods: {
    changeUrl1 () {
      this.url = this.$route.query.product.url1
    },
    changeUrl2 () {
      this.url = this.$route.query.product.url2
    },
    changeUrl3 () {
      this.url = this.$route.query.product.url3
    },
    changeUrl4 () {
      this.url = this.$route.query.product.url4
    },
    toCart () {
      // this.$axios
      //   .post('api/cart/addToCart', {
      //     data: {
      //       introduction: this.$route.query.product.introduction,
      //       price: this.$route.query.product.price,
      //       url: this.$route.query.product.url,
      //       brandname: this.$route.query.product.brandname
      //     },
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //     }
      //   })
      //   .then((res) => {
      //     this.$router.push({
      //       name: 'shoppingCart'
      //     })
      //   })
      if (this.username === null) {
        this.$router.push({
          name: 'login',
          params: { isback: 1 }
        })
      } else {
        this.$axios.post('/api/cart/deleteAll', {}).then((res) => {
          this.$axios.post('/api/cart/addToCart', {
            data: {
              introduction: this.$route.query.product.introduction,
              price: this.$route.query.product.price,
              url: this.$route.query.product.url,
              brandname: this.$route.query.product.brandname
            }
          }).then((res) => {
            this.$router.push({
              name: 'buy',
              params: {
                isBuy: 1,
                total: this.$route.query.product.price
              }
            })
          })
        })
      }
    },
    getCartList () {
      this.$axios.post('/api/cart/getlist', {}).then((res) => {
        this.cartPros = []
        for (var i = 0; i < res.data.length; i++) {
          this.cartPros.push({
            url: res.data[i].url
          })
        }
      })
    },
    addToCart () {
      this.getCartList()

      if (this.username === null) {
        this.$router.push({
          name: 'login',
          params: { isback: 1 }
        })
      } else if (this.cartPros.length !== 0) {
        for (var i = 1; i < this.cartPros.length; i++) {
          if (this.$route.query.product.url === this.cartPros[i].url) {
            this.flag = 1
            break
          }
        }

        if (this.flag === 0) {
          this.$axios
            .post('api/cart/addToCart', {
              data: {
                introduction: this.$route.query.product.introduction,
                price: this.$route.query.product.price,
                url: this.$route.query.product.url,
                brandname: this.$route.query.product.brandname
              },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
            .then((res) => {
              this.$alert('已成功加至购物车', '', {
                confirmButtonText: '确定'
              })
            })
        } else {
          this.$axios
            .post('/api/cart/changeNumber', {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                url: this.$route.query.product.url
              }
            })
            .then((res) => {})
        }
      } else {
        this.$axios
          .post('api/cart/addToCart', {
            data: {
              introduction: this.$route.query.product.introduction,
              price: this.$route.query.product.price,
              url: this.$route.query.product.url,
              brandname: this.$route.query.product.brandname
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then((res) => {
            this.$alert('已成功加至购物车', '', {
              confirmButtonText: '确定'
            })
          })
      }
    }

  },
  mounted () {
    this.username = JSON.parse(localStorage.getItem('username'))
    console.log(this.username)
    this.url = this.$route.query.product.url
    this.jifen = this.$route.query.product.price * 10
    this.username = JSON.parse(localStorage.getItem('username'))
  },
  watch: {
    $route (to, from) {}
  }
}
</script>

<style scoped>
#background {
  width: 100%;
}
#head {
  width: 50px;
  color: #999;
}
p {
  display: inline;
}
img {
  width: 350px;
  height: 400px;
}
#details tr td {
  height: 50px;
  font-size: 10px;
}
#details-button {
  padding: 8px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid black;
  margin-left: 10px;
}
#middle-left-small img {
  width: 80px;
  height: 80px;
  float: left;
  margin-top: 10px;
  margin-right: 10px;
}
#details-second-module img {
  width: 100%;
  height: 150px;
}
#top {
  width: 100%;
}
#middle-left {
  display: inline-block;
}
#middle-right {
  height: 400px;
  width: 500px;
  display: inline-block;
  margin-left: 100px;
  position: absolute;
}
#introduction {
  width: 500px;
  height: 50px;
}
#price {
  height: 50px;
  background-color: lightgray;
  font-size: 30px;
  text-align: left;
}
#price-style {
  color: red;
}
#middle-right-bottom {
  text-align: center;
  position: relative;
  top: 50px;
  bottom: 0px;
  left: -50px;
}
#main {
  width: 980px;

  margin: auto;
  margin-top: 100px;
}
</style>
