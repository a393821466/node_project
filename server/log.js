const bunyan = require('bunyan')
const logConfig = require('./config/config.js').logConfig
const path = require('path')
const log = bunyan.createLogger({
  name: 'myapp',
  streams: [
    {
      type: 'rotating-file',
      period: '1d',
      count: logConfig.logDay,
      level: 'info',
      path: path.resolve(__dirname, './logger/info.log')
    },
    {
      type: 'rotating-file',
      period: '1d',
      count: logConfig.logDay,
      level: 'warn',
      path: path.resolve(__dirname, './logger/warn.log')
    },
    {
      type: 'rotating-file',
      period: '1d',
      count: logConfig.logDay,
      level: 'error',
      path: path.resolve(__dirname, './logger/error.log')
    }
  ]
})
module.exports = log
