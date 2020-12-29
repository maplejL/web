<template>
  <div>
    <top></top>
    <div id="main">
      <div id="card" v-for="(address, index) in addresses" :key="index">
        <p>用户名: {{ address.username }}</p>
        <p>联系方式: {{ address.phonenumber }}</p>
        <p>收件地址:{{ address.address }}</p>
      </div>
      <el-button type="text" @click="dialogFormVisible = true"
        >增加新地址信息</el-button
      >
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择省份">
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-divider content-position="left">订单详情</el-divider>
      <div id="order">
        <el-table
          ref="multipleTable"
          :data="cartpros"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="商品" width="150">
            <template slot-scope="scope"><img :src="scope.row.url" /></template>
          </el-table-column>
          <el-table-column prop="name" label="商品信息" width="300">
            <template slot-scope="scope">{{ scope.row.introduction }}</template>
          </el-table-column>
          <el-table-column prop="address" label="价格" show-overflow-tooltip>
            <template slot-scope="scope"
              ><span>￥{{ scope.row.price }}</span></template
            >
          </el-table-column>
          <el-table-column prop="address" label="数量" show-overflow-tooltip>
            <template slot-scope="scope"
              ><span>{{ scope.row.number }}</span></template
            >
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px" id="table-bottom">
          <p>总价: ￥{{this.$route.params.total}}</p>
          <div id="buyButton">
            <el-button type="danger" @click="pay">付款</el-button>
          </div>
        </div>
      </div>
    </div>
    <Footer id="foot"></Footer>
  </div>
</template>

<script>
import top from './top'
import Footer from './footer'

export default {
  components: {
    top,
    Footer
  },
  data () {
    return {
      cartpros: [],
      addresses: [],
      total: 0,
      url: '/static/pay.jpg',
      timer: 0,
      address: '',
      dialogFormVisible: false,
      form: {
        name: '',
        phone: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      isBuy: 0
    }
  },
  methods: {
    dialogConfirm () {
      this.$axios.post('/api/address/addNew', {
        data: {
          name: this.form.name,
          phone: this.form.phone,
          address: this.form.region
        }
      }).then((res) => {
        this.dialogFormVisible = false
        this.getAddress()
      })
    },
    open () {
      this.$prompt('请输入地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {

        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    pay () {
      this.$alert('<strong><img src=' + this.url + ' width=300px height=300px></strong>', '请扫码支付', {
        dangerouslyUseHTMLString: true
      }).then(action => {
        this.$axios.post('/api/cart/deleteAll', {}).then((res) => {})
        this.$alert('付款成功，即将返回首页!')
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$router.push('/home')
        }, 2000)
      })
    },
    getAddress () {
      this.addresses = []
      this.$axios.get('/api/address/getlist', {}).then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.addresses.push({
            username: res.data[i].username,
            address: res.data[i].address,
            phonenumber: res.data[i].phone
          })
        }
      })
    },
    getProducts () {
      this.$axios
        .post('/api/cart/getlist', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            if (this.isBuy === 0) {
              if (res.data[i].checked !== 0) {
                this.cartpros.push({
                  url: res.data[i].url,
                  introduction: res.data[i].introduction,
                  price: res.data[i].price,
                  number: res.data[i].number
                })
              } else {
                this.cartpros.push({
                  url: res.data[i].url,
                  introduction: res.data[i].introduction,
                  price: res.data[i].price,
                  number: res.data[i].number
                })
              }
            }
          }
        })
    }
  },
  mounted () {
    this.getProducts()
    this.getAddress()
    console.log(this.cartpros)
  },
  watch: {
    $router (to, from) {
      this.isBuy = this.$route.params.isBuy
    }
  }
}
</script>

<style scoped>
#main {
  width: 980px;

  margin: auto;
  margin-top: 50px;
  margin-bottom: 300px;
}
#card {
  border: 1px solid black;
  background-color: lightgray;
  width: 200px;
  line-height: 10px;
  display: inline-block;
  margin-left: 20px;
}
#order {
  width: 980px;
  height: 300px;
}
img {
  width: 100px;
  height: 100px;
}
</style>
