const sqls = require("../connect").do;

//同步品牌表的code到domain表
const insertCode = (val) => {
  let _sql = `insert into live_domain(code) values(?)`;
  return sqls(_sql, val);
}

module.exports = {
  insertCode
}