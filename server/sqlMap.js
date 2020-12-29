// eslint-disable-next-line no-unused-vars
const { search } = require('./api/cartApi')

// sqlmap.js
var sqlMap = {
  // home
  home: {
    search: 'select * from user',
    setuser: 'insert into user(uid,username,psd) values(?,?,?)'
  },
  products: {
    search: 'select * from products',
    getByBrand: 'select * from products where brandname=?',
    searchByInput: 'select * from products where introduction like ?'
  },
  pl: {
    search: 'select * from pl',
    add: 'insert into pl(uname,date,content) values(?,?,?)',
    delete: 'delete from pl where plnumber=?'
  },
  cart: {
    search: 'select * from cart',
    add: 'insert into cart(introduction,price,url,brandname,checked) values(?,?,?,null,0)',
    deletePro: 'delete from cart where url=?',
    changeChecked: 'update cart set checked = ? where url=?'
  },
  other: {
    delete: '', // delete sql语句
    post: '',
    get: ''
  }
}
module.exports = sqlMap
