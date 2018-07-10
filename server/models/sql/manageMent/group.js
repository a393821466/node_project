const sqls = require("../connect").do;

//查找groupId
const findGroup = (fieId, value) => {
  let _sql = `select * from live_group where ${fieId}="${value}"`;
  return sqls(_sql)
}

//插入用户组
const innsertGroup = (val) => {
  let _sql = `insert into live_group(name, introduce, merchant, icon,power, create_time) values(?,?,?,?,?,?)`;
  return sqls(_sql, val);
}

module.exports = {
  findGroup,
  innsertGroup
}