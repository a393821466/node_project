const bunyan = require('bunyan')
const path = require('path')
const moment = require('../utils/utils').common
/**
 * 记录用户轨迹
 * @param {String} name 用户名
 * @param {any} data 所要记录的数据
 * @param {String} [level='info'] 日志等级 fatal,error,warn,info,debug,trace
 */
const userLog = (name, data, level = 'info') => {
  if (
    ['fatal', 'error', 'warn', 'info', 'debug', 'trace'].indexOf(level) === -1
  ) {
    throw new Error(
      'level should be one of fatal,error,warn,info,debug,trace.but it is ' +
        level +
        '.'
    )
  }
  const log = bunyan.createLogger({
    name: name,
    streams: [
      {
        path: path.resolve(__dirname, `../logger/user/user_${moment.now('YYYY-MM-DD')}.log`)
      }
    ]
  })
  log[level](data)
}

module.exports = userLog
