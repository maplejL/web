var models = require('../db') // 引入db配置
var express = require('express') // express框架
var router = express.Router()
var mysql = require('mysql')

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
router.get('/getlist', (req, res) => {
  var sql = 'select * from address'
  console.log('1')
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      res.send(result)
    }
  })
})
router.post('/addNew', (req, res) => {
  var sql = 'insert into address values(?,?,?)'
  var parms = req.body.data
  console.log(parms)
  conn.query(sql, [parms.name, parms.phone, parms.address], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      res.send(result)
    }
  })
})
module.exports = router
