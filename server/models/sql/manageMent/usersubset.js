const sqls = require("../connect").do;

//用户信息附表插入语句
const subsetInsert= (value) => {
  let _sql=`insert into live_usersubset(userid,phone,qq,superior_user,anexcuse_time,freeze_time) values(?,?,?,?,?,?)`
  return sqls(_sql,value);
}

module.exports={
  subsetInsert
}