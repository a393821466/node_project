process.env.NODE_ENV = 'development' // production || development
const config = {
  //数据库配置
  sqlConfig: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'live_db'
  },
  //redis配置
  redisConfig: {
    host: '127.0.0.1',
    port: 6379
    // password:''
  },
  EXPIRE: 3600, // redis缓存的生存时间 1h,1*60*60
  checkList: ['name', 'email', 'admin', 'administrator'], //禁止其它用户以这些用户名注册

  //日志
  logConfig: {
    logDay: 1 // 日志保存天数
  },

  //初始超级管理员账号密码
  administrator: {
    "username": "admin",
    "password": "admin",
    "groupId": 1,
    "status": 1,
    "statusId": 1,
    "create_time": Date.now()
  },
  //数据表
  db_sql: {
    live_user: "live_user"
  }
}

module.exports = config;