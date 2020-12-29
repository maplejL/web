<template>
  <div>
    <div v-if="currpage * pagesize - total <= 0">
      <el-row v-for="i in pagesize / 4" :key="i">
        <el-col :span="6" v-for="count in 4" :key="count">
          <a
            href="#"
            @click="
              toDetails(products[4 * i + count - 5 + (currpage - 1) * pagesize])
            "
          >
            <el-card class="product">
              <img
                :src="
                  products[4 * i + count - 5 + (currpage - 1) * pagesize].url
                "
              />
              <div style="padding: 0px">
                <span class="price"
                  >￥
                  {{
                    products[4 * i + count - 5 + (currpage - 1) * pagesize]
                      .price
                  }}</span
                >
              </div>
              <span>{{
                products[4 * i + count - 5 + (currpage - 1) * pagesize]
                  .introduction
              }}</span>
            </el-card>
          </a>
        </el-col>
      </el-row>
      <!-- <mytable
      :products="products.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
      id="mytable"
      :currpage="currpage"
      :pagesize="pagesize"
      :total="products.length"
    >
    </mytable>  -->
      <div id="pagination">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[8, 16, 24, 32]"
          :page-size="pagesize"
          :total="products.length"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </div>

    <div v-else-if="total - (currpage - 1) * pagesize < 4">
      <el-row v-for="i in 1" :key="i">
        <el-col
          :span="6"
          v-for="count in total - (currpage - 1) * pagesize"
          :key="count"
        >
          <a
            href="#"
            @click="
              toDetails(products[4 * i + count - 5 + (currpage - 1) * pagesize])
            "
          >
            <el-card class="product">
              <img
                :src="
                  products[4 * i + count - 5 + (currpage - 1) * pagesize].url
                "
              />
              <div style="padding: 0px">
                <span class="price"
                  >￥
                  {{
                    products[4 * i + count - 5 + (currpage - 1) * pagesize]
                      .price
                  }}</span
                >
              </div>
              <span>{{
                products[4 * i + count - 5 + (currpage - 1) * pagesize]
                  .introduction
              }}</span>
            </el-card>
          </a>
        </el-col>
      </el-row>
      <!-- <mytable
      :products="products.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
      id="mytable"
      :currpage="currpage"
      :pagesize="pagesize"
      :total="products.length"
    >
    </mytable>  -->
      <div id="pagination">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[8, 16, 24, 32]"
          :page-size="pagesize"
          :total="products.length"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <el-row
        v-for="i in (total -
          (currpage - 1) * pagesize -
          ((total - (currpage - 1) * pagesize) % 4)) /
          4 +
        1"
        :key="i"
      >
        <el-col
          :span="6"
          v-for="count in total - 4 * i + 4 < 4
            ? (total - (currpage - 1) * pagesize) % 4
            : 4"
          :key="count"
        >
          <a
            href="#"
            @click="
              toDetails(products[4 * i + count - 5 + (currpage - 1) * pagesize])
            "
          >
            <el-card class="product">
              <img
                :src="
                  products[4 * i + count - 5 + (currpage - 1) * pagesize].url
                "
              />
              <div style="padding: 0px">
                <span class="price"
                  >￥
                  {{
                    products[4 * i + count - 5 + (currpage - 1) * pagesize]
                      .price
                  }}</span
                >
              </div>
              <span>{{
                products[4 * i + count - 5 + (currpage - 1) * pagesize]
                  .introduction
              }}</span>
            </el-card>
          </a>
        </el-col>
      </el-row>
      <!-- <mytable
      :products="products.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
      id="mytable"
      :currpage="currpage"
      :pagesize="pagesize"
      :total="products.length"
    >
    </mytable>  -->
      <div id="pagination">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[8, 16, 24, 32]"
          :page-size="pagesize"
          :total="products.length"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import mytable from './mytable'
export default {
  props: ['brandMsg', 'inputSearch', 'isLogout'],
  components: {
    mytable
  },
  computed: {
    pages () {
      const pages = []
      this.products.forEach((item, index) => {
        const page = Math.floor(index / 4)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      console.log(pages)
      return pages
    },
    total () {
      return this.products.length
    }
  },
  data () {
    return {
      count: 0,
      url: '',
      products: [],
      proNumber: 0,
      cartProducts: [],
      pagesize: 16,
      currpage: 1
    }
  },
  methods: {
    handleCurrentChange (cpage) {
      this.currpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },
    toDetails (product) {
      console.log(product.url1)
      this.$router.push({
        name: 'proDetails',
        query: {
          product: product
        }
      })
    },
    getProducts () {
      this.products = []
      this.$axios.get('/api/products/getlist', {}).then((response) => {
        this.proNumber = response.data.length
        for (var i = 0; i < this.proNumber; i++) {
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
        console.log(this.products)
      })
    },
    getProductsByBrand () {
      this.products = []
      this.$axios
        .get('/api/products/getByBrand', {
          params: {
            msg: this.brandMsg
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((response) => {
          this.proNumber = response.data.length

          for (var i = 0; i < this.proNumber; i++) {
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
    },
    getProBySearch () {
      this.products = []
      this.$axios
        .get('/api/products/getProBySearch', {
          params: {
            introduction: '%' + this.inputSearch + '%'
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((response) => {
          this.proNumber = response.data.length
          console.log(this.proNumber)
          for (var i = 0; i < this.proNumber; i++) {
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
  created () {
    this.getProducts()
    // if (this.$route.params.brandname == "") {
    //   this.getProducts();
    // } else {
    //   this.getProductsByBrand();
    // }
  },
  mounted () {},
  watch: {
    $route (to, from) {
      if (this.brandMsg !== '') {
        this.getProductsByBrand()
      } else {
        this.getProducts()
      }
      if (this.inputSearch !== '') {
        this.getProBySearch()
      } else {
        this.getProducts()
      }
      if (this.isLogout === 1) {
        this.getProducts()
      }
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
img {
  width: 250px;
  height: 200px;
}
#pagination {
  position: relative;
}
.product {
  width: 300px;
  height: 350px;
  float: left;
  position: relative;
  left: 0px;
}
#mytable {
  position: relative;
  left: 50px;
}
.price {
  color: red;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 130px;
  display: block;
  padding: 5px;
  margin: auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
