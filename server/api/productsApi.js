var models = require('../db') // 引入db配置
var express = require('express') // express框架
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap') // sql语句

var conn = mysql.createConnection(models.mysql)
conn.connect()

var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

router.get('/getlist', (req, res) => {
  var sql = $sql.products.search

  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      res.send(result)
    }
  })
})

router.get('/getProBySearch', (req, res) => {
  var sql = $sql.products.searchByInput
  var parms = req.query

  conn.query(sql, parms.introduction, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      res.send(result)
    }
  })
})
router.get('/getByBrand', (req, res) => {
  var sql = $sql.products.getByBrand

  var brandname = req.query.msg
  console.log(brandname)
  conn.query(sql, brandname, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      res.send(result)
    }
  })
})
// 新增列表
router.post('/addlist', (req, res) => {
  var sql = $sql.user.add
  var parms = req.body
  console.log(parms)
  conn.query(sql, [parms.title, parms.num], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
