const sqls = require("../connect").do;
//查找用户名
const findUsername = (value) => {
  let _sql = `select * from live_user where id=?`;
  return sqls(_sql, value)
}

//查找用户品牌
const findUserMerchant = (value) => {
  let _sql = `select * from live_group g,live_user u where g.merchant=u.merchant and u.merchant=?`;
  return sqls(_sql, value)
}

//验证用户名密码
const validateUser = (value) => {
  let _sql = `select * from live_user where username=? and password=?`;
  return sqls(_sql, value)
}

//验证用户名密码和品牌
const vaUserPswMerchant = (value) => {
  let _sql = `select * from live_user where username=? and password=? and merchant=?`;
  return sqls(_sql, value)
}

//插入用户
const innsertUsername = (val) => {
  let _sql = `insert into live_user(username,password,nicename,merchant,avator,status,frozenStatus,roomId,phone,qq,superior_user,create_time) values(?,?,?,?,?,?,?,?,?,?,?,?)`;
  return sqls(_sql, val);
}
//删除用户
const delUsername = (ids) => {
  let params = [];
  let _sql = `delete from live_user where id in (`
  for (let i = 0; i < ids.length; i++) {
    params.push(ids[i]);
  }
  for (let i = 0; i < ids.length - 1; i++) {
    _sql = _sql + ids[i];
  }
  _sql = _sql + ids[ids.length - 1] + `)`;
  return sqls(_sql, params)
}

//选择查询
const blurryFind = (val1, val3, val4, val5, val6, val7, page, size) => {
  let _sql = `select * from live_user where 1=1 `;
  let arr = [];
  if (val1 != "") {
    val1 = "%" + val1 + "%";
    _sql += `and username like ? `
    arr.push(val1)
  }
  // if (val2 != "") {
  //   val2 = "%" + val2 + "%";
  //   _sql += `and groupId like ? `
  //   arr.push(val2)
  // }
  if (val3 != "") {
    val3 = "%" + val3 + "%";
    _sql += `and nicename like ? `
    arr.push(val3)
  }
  if (val4 != "") {
    val4 = "%" + val4 + "%";
    _sql += `and status like ? `
    arr.push(val4)
  }
  if (val5 != "") {
    val5 = "%" + val5 + "%";
    _sql += `and roomId like ? `
    arr.push(val5)
  }
  if (val6 != "") {
    val6 = "%" + val6 + "%";
    _sql += `and superior_user like ? `
    arr.push(val6)
  }
  if (val7 != "") {
    val7 = "%" + val7 + "%";
    _sql += `and create_time like ? `
    arr.push(val7)
  }
  _sql += `ORDER BY create_time,id limit ?,?`;
  arr.push((page - 1) * size, size);
  return sqls(_sql, arr);
}

//查询条数
const userCount = () => {
  let _sql = `select count(*) as count from live_user`;
  return sqls(_sql);
}

//更新
const updateUser = (value, id) => {
  let _sql = `update live_user set password=?,nicename=?,avator=?,phone=?,qq=? ,status=?,roomId=? where id=${id}`;
  return sqls(_sql, value);
}
//单个级联删除
// const delUserAndGroup = (idx) => {
// let _sql = `delete live_user,live_usergroup from live_user left join live_usergroup on live_user.id = live_usergroup.userid where live_user.id=${idx}`
// return sqls(_sql)
// }

//单个删除
// const deleSingle = (db, ids) {
//   let _sql = `delete from ${db} where id = ?`;
//   return sqls(_sql, ids)
// }

module.exports = {
  findUsername,
  findUserMerchant,
  validateUser,
  vaUserPswMerchant,
  innsertUsername,
  delUsername,
  // delUserAndGroup,
  blurryFind,
  userCount,
  updateUser
}