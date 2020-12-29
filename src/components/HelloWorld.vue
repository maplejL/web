<template>
  <div>
    <el-button type="primary" @click="test">vuex</el-button>

    <el-button type="primary" >登陆</el-button>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'HelloWorld',
  components: {
    store
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'

    }
  },
  methods: {
    test () {
      console.log(this.$store.state.count)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
