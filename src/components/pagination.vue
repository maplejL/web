<template>
  <div>
    <el-pagination background layout="prev, pager, next" :total="100" @prev-click="back" @next-click="next">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0
    }
  },
  props: ['proNumber'],
  methods: {
    back () {
      console.log(1)
    },
    next () {
    }
  },
  mounted () {
    this.total = this.proNumber / 2
    console.log(this.total)
  }
}
</script>

<style scoped>

</style>
