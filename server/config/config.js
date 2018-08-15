process.env.NODE_ENV = 'development' // production || development
const config = {
  //基础配置
  domain:'http://127.0.0.1:3001', //暂时测试本地存储图片域名
  PORT: 3001, //测试端口
  isDebug: process.env.NODE_ENV !== 'production', // 只有production才关闭debug功能
  logConfig: {
    logDay: 1 // 日志保存天数
  },
  //生产数据库配置
  sqlConfig: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'live_db'
  },
  //测试数据库
  testsqlConfig: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'live_test_db'
  },
  //七牛配置
  qiniu:{
    accessKey:'',
    secretKey:'',
    bucket:'', //七牛云空间名字
    origin:'' //域名
  },
  //redis配置
  redisConfig: {
    host: '127.0.0.1',
    port: 6379
    // password:''
  },
  EXPIRE: 10800, // redis的token生存时间3小时 3h,3*60*60
  LONGEXPIRE: 259200,//redis的token生存时间3天  3 * 24 * 60 * 60
  checkList: ['name', 'email', 'admin', 'administrator'], //禁止其它用户以这些用户名注册

  Merchant: false,
  //初始化超级管理员权限以及超级管理员账号密码
  adminPrmission: ['超级管理员', '你们都是我小弟', 'system', '', 1, Date.now()],
  administrator: {
    username: 'admin', //管理员账号不要改，密码可以改
    password: 'admin',
    nicname: '沙拉嘿哟',
    merchant: 'system',
    groupName:'超级管理员',
    status: 1,
    f_status: 1,
    a_status: 1,
    create_time: Date.now()
  }
}

module.exports = config
