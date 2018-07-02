//数据库配置
const sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'live_db'
}

//超级管理员
const administrator = {
  "username": "admin",
  "password": "admin",
  "status": 0
}

module.exports = {
  sqlConfig,
  administrator
}