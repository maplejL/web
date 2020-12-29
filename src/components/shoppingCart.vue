<template>
  <div>
    <top></top>
    <div id="main">
      <mainCart></mainCart>
    </div>
    <div id="bottom">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from './footer.vue'
import top from './top'
import mainCart from './mainCart'
export default {
  components: {
    top,
    Footer,
    mainCart
  }
}
</script>

<style scoped>
#page-top {
  width: 100%;
  height: 50px;
  background-color: lightgray;
}
#main {
  width: 980px;

  margin: auto;
}
#bottom {
  width: 100%;
}
</style>
