const bunyan = require('bunyan')
const logConfig = require('./config/config.js').logConfig
const path = require('path')
const moment = require('./utils/tool')
const log = bunyan.createLogger({
  name: 'myapp',
  streams: [
    {
      type: 'rotating-file',
      period: '1d',
      count: logConfig.logDay,
      level: 'info',
      path: path.resolve(
        __dirname,
        `./logger/info_${moment.now('YYYY-MM-DD')}.log`
      )
    },
    // {
    //   type: 'rotating-file',
    //   period: '1d',
    //   count: logConfig.logDay,
    //   level: 'warn',
    //   path: path.resolve(__dirname, './logger/warn.log')
    // },
    {
      type: 'rotating-file',
      period: '1d',
      count: logConfig.logDay,
      level: 'error',
      path: path.resolve(
        __dirname,
        `./logger/error_${moment.now('YYYY-MM-DD')}.log`
      )
    }
  ]
})
module.exports = log
