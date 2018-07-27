const sqls = require('../connect').do

//用户信息附表插入语句
const subsetInsert = value => {
  let _sql = `insert into live_usersubset(userid,phone,qq,superior_user,end_anexcuse_time,end_freeze_time) values(?,?,?,?,?,?)`
  return sqls(_sql, value)
}

//更新用户信息附表
const updateTable = value => {
  let _sql = `update live_usersubset set phone=?,qq=? where userid=?`
  return sqls(_sql, value)
}

//更新用户状态时间
const updateUserTime = value => {
  let _sql = `update live_usersubset set end_anexcuse_time=?,end_freeze_time=? where userid=?`
  return sqls(_sql, value)
}

//查询信息
const findUserBset=(idx,value)=>{
  let _sql ='';
  if(idx=='findStatus'){
    _sql=`select b.end_anexcuse_time,b.end_freeze_time from live_usersubset as b where userid=?`
  }else{
    _sql=`select * from live_usersubset where userid=?`
  }
  return sqls(_sql,value);
}

module.exports = {
  subsetInsert,
  updateTable,
  findUserBset,
  updateUserTime
}
