const sqls = require("../connect").do;

//查找用户组
const findGroup = (type, value) => {
  let _sql = '';
  if (type == 'id') {
    _sql = `select * from live_group where id=? and merchant=?`
  }
  if (type == 'name') {
    _sql = `select * from live_group where name=? and merchant=?`
  }
  return sqls(_sql, value)
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