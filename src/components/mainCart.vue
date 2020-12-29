<template>
  <div>
    <!-- <table width="100%">
      <thead>
        <td width="100px"></td>
        <td width="150px">商品</td>
        <td width="300px">商品信息</td>
        <td>价格</td>
        <td>数量</td>
      </thead>
      <tbody>
        <tr v-for="(item,index) in tableData" :key="index">
        <td width="100px"></td>
        <td width="150px">
          <img :src="item.url" />
        </td>
        <td width="300px">{{item.introduction}}</td>
        <td>{{item.price}}</td>
        <td>
                    <input
            type="button"
            value="-"
            @click="desNum(item)"
            :disabled="item.needNumber == 1"
          />
          {{item.needNumber}}
          <input type="button" value="+" @click="incNum(scope)" />
          </td>
          <td>
                      <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deletePro(item)"
          ></el-button>
          </td>
        </tr>
      </tbody>
    </table> -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column>
        <input type="checkbox" />
        <template slot-scope="scope"
          ><input
            type="checkbox"
            @click="changeChecked(scope)"
            :checked="scope.row.checked"
        /></template>
      </el-table-column>
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
        <template slot-scope="scope">
          <input
            type="button"
            value="-"
            @click="desNum(scope)"
            :disabled="scope.row.needNumber == 1"
          />
          {{ scope.row.needNumber }}
          <input type="button" value="+" @click="incNum(scope)" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="移出购物车" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deletePro(scope)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px" id="table-bottom">
      <p>总价:&nbsp;&nbsp;&nbsp;&nbsp;{{ getTotalPrice }}</p>
      <div id="buyButton">
        <el-button type="danger" @click="toBuy" :disabled="getTotalPrice == 0"
          >去付款</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      len: 0,
      tableData: [

      ],
      multipleSelection: []
    }
  },
  computed: {
    getTotalPrice () {
      var totalPrice = 0
      this.tableData.forEach((item) => {
        if (item.checked === 1) {
          totalPrice = totalPrice + item.price * item.needNumber
          return item.price
        }
      })
      console.log(this.tableData)
      return totalPrice
    }
  },
  methods: {
    deletePro (scope) {
      console.log(this.tableData[1])
      this.tableData.splice(this.tableData.indexOf(scope.row), 1)
      this.$axios
        .post('/api/cart/deletePro', {
          data: {
            url: scope.row.url
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res) => {
        })
    },
    toBuy () {
      this.$router.push({
        name: 'buy',
        params: {
          total: this.getTotalPrice,
          cartPros: this.tableData
        }
      })
    },
    changeChecked (scope) {
      if (scope.row.checked === 0) {
        scope.row.checked = 1
        this.$axios
          .post('/api/cart/changeChecked', {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              checked: 1,
              url: scope.row.url
            }
          })
          .then((res) => {})
      } else {
        this.$axios
          .post('/api/cart/changeChecked', {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              checked: 0,
              url: scope.row.url
            }
          })
          .then((res) => {})
        scope.row.checked = 0
      }
    },
    desNum (scope) {
      this.$axios.post('/api/cart/desNum', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          url: scope.row.url
        }
      }).then((res) => {
        scope.row.needNumber--
      })
    },
    incNum (scope) {
      this.$axios.post('/api/cart/incNum', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          url: scope.row.url
        }
      }).then((res) => {
        scope.row.needNumber++
      })
    },
    getCartProducts () {
      this.tableData = []
      this.$axios
        .post('/api/cart/getlist', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res) => {
          this.len = res.data.length
          console.log(this.len)
          for (var i = 0; i < this.len; i++) {
            this.tableData.push({
              introduction: res.data[i].introduction,
              url: res.data[i].url,
              price: res.data[i].price,
              checked: 0,
              needNumber: res.data[i].number
            })
          }
        })
    }
  },
  created () {
    this.getCartProducts()
  }
}
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
p {
  display: inline-block;
}
#table-bottom {
  width: 980px;
  height: 100px;
  position: relative;
}
#buyButton {
  display: inline-block;
  position: absolute;
  right: 0px;
}
</style>
