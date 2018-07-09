const sqls = require("../connect").do;

//查找用户名
const findMerchant = (merchant, value) => {
  let _sql = `select * from live_merchant where ${merchant}="${value}"`;
  return sqls(_sql)
}

//插入品牌
const innsertMerchant = (value) => {
  let _sql = `insert into live_merchant(merchant,create_time) values(?,?)`;
  return sqls(_sql, value);
}

//品牌删除
const delMerchant = (ids) => {
  let _sql = `delete from live_merchant where id = ?`;
  return sqls(_sql, ids)
}

//查找品牌
const blurryFind = (val1, page, size) => {
  let _sql = `select * from live_merchant where 1=1 `;
  let arr = [];
  if (val1 != "") {
    val1 = "%" + val1 + "%";
    _sql += `and merchant like ? `
    arr.push(val1)
  }
  _sql += `limit ?,?`;
  arr.push((page - 1) * size, size);
  return sqls(_sql, arr);
}

module.exports = {
  findMerchant,
  innsertMerchant,
  blurryFind,
  delMerchant
}