const initConfig = require("../config/config");
const db = require("../models/createDB");
const md5 = require("../middleware/md5");
const mysql = require("../models/connect");
const redis = require("../redis");
const administrator = initConfig.administrator;
class init {
  /**
   * 单例方法
   */
  static getInstance() {
    if (!init.instance) {
      init.instance = new init();
    }
    return init.instance;
  }
  constructor() {
    init.connectInit();
  }
  //等待方法执行
  static async connectInit() {
    try{
      await init.isInsertAdmin();
      await init.testRedisConnect();
      mysql.quit();
      redis.quit();
      console.log("哟西，初始化成功,试试启动项目吧!");
    }catch(e){
      console.log("初始化失败,请检查mysql、redis配置是否正确");
    }
  }
  //判断超级管理员是否存在,如果不存在就走if进入下一个方法
  static async isInsertAdmin() {
    const findAdmin = await db.findData(initConfig.db_sql.live_user,"username", administrator.username);
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
//初始化方法
init.getInstance();