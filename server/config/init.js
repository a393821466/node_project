const initConfig = require('../config/config')
const sql = require('../models/sql/connect').do
const User = require('../models/sql/manageMent/user')
const Group = require('../models/sql/manageMent/group')
const Usergroup = require('../models/sql/manageMent/userGroup')
const UserMerchant = require('../models/sql/manageMent/merchant')
const md5 = require('../utils/md5')
const mysql = require('../models/sql/connect')
const redis = require('./redis.config').redisConfigs
const administrator = initConfig.administrator
class init {
  /**
   * 单例方法
   */
  static getInstance() {
    if (!init.instance) {
      init.instance = new init()
    }
    return init.instance
  }
  constructor() {
    init.connectInit()
  }
  //等待方法执行
  static async connectInit() {
    try {
      await init.testRedisConnect()
      await init.createAdminMerchant()
      mysql.quit()
      redis.quit()
    } catch (e) {
      console.log(e)
      console.log('初始化失败,请检查mysql、redis配置是否正确')
    }
  }

  //验证redis连接
  static async testRedisConnect() {
    let r = await redis.redisClient()
    console.log(r)
  }
  //创建管理员品牌
  static async createAdminMerchant() {
    const getAdmins = await UserMerchant.innsertMerchant(
      initConfig.adminMerchant
    )
    if(getAdmins.length>0){
      throw Error('管理员品牌已存在')
      return
    }
    console.log('管理员品牌创建成功')
    await this.isInsertAdmin()
  }
  //判断超级管理员是否存在
  static async isInsertAdmin() {
    const findAdmin = await User.validateUser([
      administrator.username,
      md5(md5(administrator.password) + 'maple')
    ])
    if (findAdmin.length == 0 && findAdmin) {
      let findAdminUser = await this.insertAdmins()
      await this.adminAddGroup(findAdminUser.insertId)
    } else {
      if (findAdmin.syscall) {
        throw Error('数据库连接超时')
        return
      }
      console.log('超级管理员已存在')
    }
  }
  //创建超级管理员
  static async insertAdmins() {
    return await new Promise((resolve, reject) => {
      try {
        let createTime = Date.now()
        let adminUser = [
          administrator.username,
          md5(md5(administrator.password) + 'maple'),
          administrator.nicname,
          administrator.merchant,
          administrator.groupName,
          administrator.status,
          administrator.f_status,
          administrator.a_status,
          createTime
        ]
        let addADmin = sql(
          `insert into live_user(username, password,nicename,user_code,groupName, status, f_status,a_status, create_time) values(?,?,?,?,?,?,?,?,?)`,
          adminUser
        )
        resolve(addADmin)
      } catch (e) {
        reject('超级管理员创建失败')
      }
    })
  }
  //超级管理员加入分组
  static async adminAddGroup(uid) {
    const findGroup = await Group.findGroup('name', [
      '超级管理员',
      administrator.merchant
    ])
    if (findGroup.length > 0) {
      console.log('超级管理员组已存在')
      return
    }
    const newAddGroup = await Group.innsertGroup(initConfig.adminPrmission)
    if (!newAddGroup) {
      console.log('超级管理员组初始化失败')
    }
    let addGroup = await Usergroup.innsertGroup([uid, newAddGroup.insertId])
    if (addGroup) {
      console.log('项目初始化成功')
    }
  }
}
//初始化方法
init.getInstance()
