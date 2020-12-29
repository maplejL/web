// node后端服务器
const homeApi = require('./api/homeApi') // 上面说的后台接口文件
const productsApi = require('./api/productsApi')
const cartApi = require('./api/cartApi')
const plApi = require('./api/plApi')
const addressApi = require('./api/addressApi')

// body-parser是非常常用的一个express中间件，作用是对http请求体进行解析

const express = require('express') // express框架
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 后端api路由
app.use('/api/home', homeApi) // 使用homeapi文件中的接口
app.use('/api/products', productsApi)
app.use('/api/cart', cartApi)
app.use('/api/pl', plApi)
app.use('/api/address', addressApi)
// 监听端口
app.listen(3000) // 监听server3000端口
console.log('success listen at port:3000')
