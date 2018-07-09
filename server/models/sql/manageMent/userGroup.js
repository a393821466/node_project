const sqls = require("../connect").do;

//插入到group权限
const innsertGroup = (value) => {
  let _sql = `insert into live_usergroup (userid,groupid) values(?,?)`;
  return sqls(_sql,value);
}

//删除groupid
const delGroup=(ids)=>{
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

module.exports={
  innsertGroup,
  delGroup
}