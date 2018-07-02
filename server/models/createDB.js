const sqls = require("./connect").do;

//插入语句
let insertData = (value) => {
  let _sql = "insert into live_user(username,password,groupId,nicename,avator,status,statusId,roomId,phone,qq,create_time) values(?,?,?,?,?,?,?,?,?,?,?)";
  return sqls(_sql, value);
}

//查找用户名语句
let findData = (username) => {
  let _sql = `select * from live_user where username="${username}";`
  return sqls(_sql)
}

//查找所有用户
let findAll=()=>{
  let _sql = `select * from live_user;`
  return sqls(_sql)
}
module.exports = {
  insertData,
  findData,
  findAll
}