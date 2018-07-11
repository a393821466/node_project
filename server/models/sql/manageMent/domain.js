const sqls = require("../connect").do;

//同步品牌表的code到domain表
const updateCode = (val) => {
  let _sql = `insert into live_domain(code) select ? from live_merchant`;
  return sqls(_sql, val);
}

module.exports = {
  updateCode
}