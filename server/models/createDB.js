const sqls = require("./connect").do;
const md5 = require("../middleware/md5");
const initConfig = require("../config/config");
const administrator=initConfig.administrator;
class dbOperating {
  constructor() {
    this.admin = "";
  }
  //如果超级管理员存在
  static async isInsertAdmin() {
    if (this.admin == "" || this.admin == undefined) {
      const findAdmin = await this.findData(initConfig.db_sql.live_user,administrator.username);
      if (findAdmin.length == 0) {
        this.insertAdmins().then(ret => {
          console.log("超级管理员创建成功");
        });
      }
    }
  }
  //创建超级管理员
  static async insertAdmins() {
    let _this = this;
    return await new Promise((resolve, reject) => {
      try {
        let createTime = Date.now();
        let addAdmin = _this.insertData([initConfig.username, md5(md5(initConfig.password) + 'maple'), initConfig.groupId, "", "", initConfig.status, initConfig.statusId, "", "", "", "", createTime]);
        resolve(addAdmin);
      } catch (e) {
        reject(e);
      }
    })
  }
  //插入语句
  static async insertData(value) {
    let _sql = "insert into live_user(username,password,groupId,nicename,avator,status,statusId,roomId,phone,qq,superior_user,create_time) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    return sqls(_sql, value);
  }
  //查找用户名
  static async findData(db,username) {
    let _sql = `select * from ${db} where username="${username}"`;
    return sqls(_sql)
  }
  //查找所有用户
  static async findAll(db) {
    let _sql = `select * from ${db}`;
    return sqls(_sql)
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
    return sqls(_sql,ids)
  }
}
dbOperating.isInsertAdmin();
module.exports = dbOperating;