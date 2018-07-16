const sqls = require("../connect").do;

//查询code
const findCode = (value) => {
  let _sql = `select * from live_merchant where code=?`;
  return sqls(_sql, value)
}

//查询merchant和code
const findMerchant = (value) => {
  let _sql = `select * from live_merchant where merchant=? or code=?`;
  return sqls(_sql, value)
}

//插入品牌
const innsertMerchant = (value) => {
  let _sql = `insert into live_merchant(merchant,code,status,create_time) values(?,?,?,?)`;
  return sqls(_sql, value);
}

//品牌删除
const delMerchant = (code) => {
  let _sql = `delete m,d from live_merchant m inner join live_domain d on m.code = d.code where m.code=?`
  return sqls(_sql, code)
}

//查找品牌
const blurryFind = (val1, page, size) => {
  let _sql = `select * from live_merchant where 1=1 `;
  let arr = [];
  if (val1 != "") {
    val1 = "%" + val1 + "%";
    _sql += `and code like ? `
    arr.push(val1)
  }
  _sql += `limit ?,?`;
  arr.push((page - 1) * size, size);
  return sqls(_sql, arr);
}

//更新品牌
const updateMerchant=(value)=>{
  let _sql=`update live_merchant set status=? where id=?`;
  return sqls(_sql,value);
}
module.exports = {
  findCode,
  findMerchant,
  innsertMerchant,
  blurryFind,
  delMerchant,
  updateMerchant
}