
<template>
  <div class="block">
    <el-carousel height="150px">
      <el-carousel-item v-for="(product, index) in products" :key="index">
        <a href="#"><img :src="product.url" class="img-size" @click="toDetails(product)" /></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      proNumber: 0,
      product: {
        url: ''
      }
    }
  },
  methods: {
    toDetails (product) {
      this.$router.push({
        name: 'proDetails',
        query: {
          product: product
        }
      })
    },
    getAllProducts () {
      this.$axios
        .get('/api/products/getlist', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((response) => {
          this.products = []
          this.proNumber = response.data.length
          for (var i = 25; i < 29; i++) {
            this.products.push({
              introduction: response.data[i].introduction,
              price: response.data[i].price,
              url: response.data[i].url,
              brandName: response.data[i].brandname,
              url1: response.data[i].url1,
              url2: response.data[i].url2,
              url3: response.data[i].url3,
              url4: response.data[i].url4
            })
          }
        })
    }
  },
  mounted () {
    this.getAllProducts()
  }
}
</script>

<style>
.img-size {
  width: 500px;
  height: 150px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
