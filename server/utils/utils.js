const moment = require('moment')
require('moment/locale/zh-cn')
//取ip地址
const getIp = req => {
  return (
    req.headers['x-forwarded-for'] ||
    req.remoteAddress ||
    req.remoteAddress ||
    req.socket.remoteAddress
  )
}
//公共方法
const common = {
  now(t) {
    return moment().format(t)
  }
}
module.exports = {
  getIp,
  common
}
