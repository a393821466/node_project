const initConfig = require("../config/config");
const db = require("../models/createDB");
const md5 = require("../middleware/md5");
const mysql = require("../models/connect");
const redis = require("../redis");
const administrator = initConfig.administrator;
class init {
  static getInstance() {
    if (!init.instance) {
      init.instance = new init();
    }
    return init.instance;
  }
  constructor() {
    init.connectInit();
  }
  static async connectInit() {
    await init.isInsertAdmin();
    await init.testRedisConnect();
    mysql.quit();
  }
  //如果超级管理员存在
  static async isInsertAdmin() {
    const findAdmin = await db.findData(initConfig.db_sql.live_user, administrator.username);
    if (findAdmin.length == 0 && findAdmin) {
      this.insertAdmins().then(ret => {
        console.log(ret);
      }).catch(err => {
        console.log(err);
      })
    } else {
      if (findAdmin.syscall) {
        throw Error("数据库连接超时");
        return;
      }
      console.log("超级管理员已存在");
    }
  }
  //创建超级管理员
  static async insertAdmins() {
    return await new Promise((resolve, reject) => {
      try {
        let createTime = Date.now();
        let addAdmin = db.insertData([administrator.username, md5(md5(administrator.password) + 'maple'), administrator.groupId, "", "", administrator.status, administrator.statusId, "", "", "", "", createTime]);
        resolve("超级管理员创建成功");
      } catch (e) {
        reject("超级管理员创建失败");
      }
    })
  }
  //验证redis连接
  static async testRedisConnect() {
    let r = await redis.redisClient();
    console.log(r);
  }
}
init.getInstance();