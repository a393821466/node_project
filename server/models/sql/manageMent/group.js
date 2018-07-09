const sqls = require("../connect").do;

//查找groupId
const findGroup = (fieId, value) => {
  let _sql = `select * from live_group where ${fieId}="${value}"`;
  return sqls(_sql)
}

module.exports = {
  findGroup
}