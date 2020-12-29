<template>
  <div>
    <table v-if="currpage * pagesize - total <= 0">
      <tr v-for="i in pagesize / 4" :key="i">
        <td v-for="count in 4" :key="count">
          <Product1 :product="products[4 * i + count - 5]"></Product1>
        </td>
      </tr>
    </table>
    <table v-else-if="total-(currpage-1)*pagesize<4">
      <tr v-for="i in 1" :key="i">
        <td v-for="count in total-(currpage-1)*pagesize" :key="count">
          <Product1 :product="products[4 * i + count - 5]"></Product1>
        </td>
      </tr>
    </table>
        <table v-else>
      <tr v-for="i in (total-(currpage-1)*pagesize-(total-(currpage-1)*pagesize)%4)/4" :key="i">
        <td v-for="count in 4" :key="count">
          <Product1 :product="products[4 * i + count - 5]"></Product1>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Product1 from './Product1.vue'
export default {
  components: { Product1 },
  props: ['products', 'total', 'currpage', 'pagesize'],
  data () {
    return {}
  },
  mounted () {}
}
</script>

<style scoped>
td {
}
</style>
