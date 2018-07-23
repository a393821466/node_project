const moment = require('moment')
require('moment/locale/zh-cn')

//工具方法
module.exports = {
  //取ip地址
  getIp(req) {
    return (
      req.headers['x-forwarded-for'] ||
      req.remoteAddress ||
      req.remoteAddress ||
      req.socket.remoteAddress
    )
  },
  //格式化日期可写入:'YYYY-MM-DD'
  now(t) {
    return moment().format(t)
  },
  //把2018-07-25T16:00:00.000Z时间格式转换时间戳
  timeFormart(t) {
    const formart = Date.parse(new Date(t))
    formart = formart / 1000
    return formart
  },
  //新旧时间相减
  newTimeAndOldTime(newTime, oldTime) {
    var sumTime = newTime - oldTime
    // var days = Math.floor(sumTime / (24 * 3600 * 1000));
    // var d = sumTime % (24 * 3600 * 1000);
    // var hours = Math.floor(d / (3600 * 1000));
    // var h = leave1 % (3600 * 1000);
    // var minutes = Math.floor(h / (60 * 1000));
    // var mm = leave2 % (60 * 1000);
    // var seconds = Math.round(mm / 1000);
    var seconds = parseInt(sumTime / 1000)
    return seconds
  }
}
