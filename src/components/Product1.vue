<template>
  <div>
      <a href="#" @click="toDetails(product)">
    <el-card class="product" >
      <img :src="product.url" />
      <div style="padding: 0px">
        <span class="price">￥ {{ product.price }}</span>
      </div>
      <span>{{ product.introduction }}</span>
    </el-card>
    </a>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    toDetails (product) {
      this.$emit('get-showDetails', 1)
      this.$router.push({
        name: 'proDetails',
        query: {
          product: product
        }
      })
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
img {
  width: 250px;
  height: 200px;
}
.product {
  width: 295px;
  height: 330px;
  float: left;
  position: relative;
  left: -50px;
}
.price {
  color: red;
}
</style>
