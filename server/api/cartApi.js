var models = require('../db') // 引入db配置
var express = require('express') // express框架
var router = express.Router()
var mysql = require('mysql')

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
router.post('/getlist', (req, res) => {
  var sql = 'select * from cart'

  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      res.send(result)
    }
  })
})
router.post('/addToCart', (req, res) => {
  var sql = 'insert into cart(introduction,price,url,brandname,checked) values(?,?,?,null,0)'
  var parms = req.body.data
  console.log(parms)
  conn.query(sql, [parms.introduction, parms.price, parms.url], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/incNum', (req, res) => {
  var sql = 'update cart set number=number+1 where url=?'
  var parms = req.body.data
  console.log(parms)
  conn.query(sql, parms.url, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/desNum', (req, res) => {
  var sql = 'update cart set number=number-1 where url=?'
  var parms = req.body.data
  console.log(parms)
  conn.query(sql, parms.url, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/deleteAll', (req, res) => {
  var sql = 'delete from cart'
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/changeNumber', (req, res) => {
  var sql = 'update cart set number=number+1 where url = ?'
  var parms = req.body.data
  console.log(req.data)
  conn.query(sql, parms.url, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/deletePro', (req, res) => {
  var sql = 'delete from cart where url=?'
  var parms = req.body.data
  conn.query(sql, parms.url, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/changeChecked', (req, res) => {
  var sql = 'update cart set checked = ? where url=?'
  var parms = req.body.data
  conn.query(sql, [parms.checked, parms.url], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
module.exports = router
