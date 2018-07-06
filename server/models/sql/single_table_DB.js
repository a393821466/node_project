const sqls = require("./connect").do;
const initConfig = require("../../config/config");
class dbOperating {
  //插入语句
  static async insertData(value) {
    let _sql = "insert into live_user(username,password,groupId,nicename,merchant,avator,status,statusId,roomId,phone,qq,superior_user,create_time) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    return sqls(_sql, value);
  }
  //查询单个数据
  static async findData(db, fieId, value) {
    let _sql = `select * from ${db} where ${fieId}="${value}"`;
    return sqls(_sql)
  }
  //查询所有数据
  static async findAll(db, page, size) {
    let arr = [(page - 1) * size, size];
    let _sql = `select * from ${db} order by id limit ?,?`;
    return sqls(_sql, arr)
  }
  //选择查询
  static async blurryFind(db, table, val1, val2, val3, val4, val5, val6, val7, page, size) {
    let _sql = `select * from ${db} where 1=1 `;
    let arr = [];
    if (val1 != "") {
      val1 = "%" + val1 + "%";
      _sql += `and ${table[0]} like ? `
      arr.push(val1)
    }
    if (val2 != "") {
      val2 = "%" + val2 + "%";
      _sql += `and ${table[1]} like ? `
      arr.push(val2)
    }
    if (val3 != "") {
      val3 = "%" + val3 + "%";
      _sql += `and ${table[2]} like ? `
      arr.push(val3)
    }
    if (val4 != "") {
      val4 = "%" + val4 + "%";
      _sql += `and ${table[3]} like ? `
      arr.push(val4)
    }
    if (val5 != "") {
      val5 = "%" + val5 + "%";
      _sql += `and ${table[4]} like ? `
      arr.push(val5)
    }
    if (val6 != "") {
      val6 = "%" + val6 + "%";
      _sql += `and ${table[5]} like ? `
      arr.push(val6)
    }
    if (val7 != "") {
      val7 = "%" + val7 + "%";
      _sql += `and ${table[6]} like ? `
      arr.push(val7)
    }
    _sql += `limit ?,?`;
    arr.push((page - 1) * size, size);
    return sqls(_sql, arr);
  }
  //批量删除
  static async deleBatch(db, ids) {
    let params = [];
    let _sql = `delete from ${db} where id in (`
    for (let i = 0; i < ids.length; i++) {
      params.push(ids[i]);
    }
    for (let i = 0; i < ids.length - 1; i++) {
      _sql = _sql + ids[i];
    }
    _sql = _sql + ids[ids.length - 1] + `)`;
    return sqls(_sql, params)
  }
  //单个删除
  static async deleSingle(db, ids) {
    let _sql = `delete from ${db} where id = ?`;
    return sqls(_sql, ids)
  }
  //更新用户多字段数据
  static async upDatedata(db, table, value, id) {
    let _sql = `update ${db} set ${table[0]}=?,${table[1]}=?,${table[2]}=?,${table[3]}=?,${table[4]}=?,${table[5]}=? ,${table[6]}=?,${table[7]}=? where id=${id}`
    return sqls(_sql, value)
  }
}

module.exports = dbOperating;