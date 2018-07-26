const sqls = require('../connect').do
//查询d
const findId = value => {
  let _sql = `select * from live_merchant where id=?`
  return sqls(_sql, value)
}

//查询code
const findCode = value => {
  let _sql = `select * from live_merchant where code=?`
  return sqls(_sql, value)
}

//查询merchant和code
const findMerchant = value => {
  let _sql = `select * from live_merchant where merchant=? or code=?`
  return sqls(_sql, value)
}

//插入品牌
const innsertMerchant = value => {
  let _sql = `insert into live_merchant(merchant,code,status,create_time) values(?,?,?,?)`
  return sqls(_sql, value)
}

//品牌删除
const delMerchant = code => {
  let _sql = `delete m,d from live_merchant m inner join live_domain d on m.code = d.code where m.code=?`
  return sqls(_sql, code)
}

//查找品牌
const blurryFind = (val1, val2, val3) => {
  let _sql = `select * from live_merchant where 1=1 `
  let arr = []
  if (val1 != '') {
    val1 = '%' + val1 + '%'
    _sql += `and merchant like ? `
    arr.push(val1)
  }
  if (val2 != '') {
    val2 = '%' + val2 + '%'
    _sql += `and code like ? `
    arr.push(val2)
  }
  if (val3 != '') {
    val3 = '%' + val3 + '%'
    _sql += `and status like ? `
    arr.push(val3)
  }
  return sqls(_sql, arr)
}

//更新品牌
const updateMerchant = value => {
  let _sql = `update live_merchant set merchant=? , status=? where id=?`
  return sqls(_sql, value)
}
module.exports = {
  findCode,
  findId,
  findMerchant,
  innsertMerchant,
  blurryFind,
  delMerchant,
  updateMerchant
}
