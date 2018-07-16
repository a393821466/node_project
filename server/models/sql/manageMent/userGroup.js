const sqls = require("../connect").do;

//创建用户组
const innsertGroup = (value) => {
  let _sql = `insert into live_usergroup (userid,groupid) values(?,?)`;
  return sqls(_sql, value);
}

//链表查询组成员
const findGroupUser = (val) => {
  let _sql = `SELECT u.* FROM live_user u,live_usergroup ug where u.id=ug.userid and ug.groupid=? ORDER BY create_time,id limit ?,?`
  return sqls(_sql, val);
}

//删除用户组
const delGroup = (ids) => {
  let params = [];
  let _sql = `delete from live_usergroup where userid in (`
  for (let i = 0; i < ids.length; i++) {
    params.push(ids[i]);
  }
  for (let i = 0; i < ids.length - 1; i++) {
    _sql = _sql + ids[i];
  }
  _sql = _sql + ids[ids.length - 1] + `)`;
  return sqls(_sql, params)
}

module.exports = {
  innsertGroup,
  findGroupUser,
  delGroup
}