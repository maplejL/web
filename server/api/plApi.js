var models = require('../db') // 引入db配置
var express = require('express') // express框架
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap') // sql语句

var conn = mysql.createConnection(models.mysql)
conn.connect()

// eslint-disable-next-line no-unused-vars
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
router.get('/getPl', (req, res) => {
  var sql = $sql.pl.search

  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      res.send(result)
    }
  })
})
router.post('/delete', (req, res) => {
  var sql = $sql.pl.delete
  var parms = req.body.query
  console.log(parms)
  conn.query(sql, parms.plnumber, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      res.send(result)
    }
  })
})
router.post('/add', (req, res) => {
  var sql = $sql.pl.add
  var parms = req.body.query
  console.log(parms)
  conn.query(sql, [parms.username, parms.date, parms.content], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      res.send(result)
    }
  })
})

module.exports = router
