const Redis = require('ioredis')
const cfg = require('./config/config')
const redisConfig = cfg.redisConfig
const redis = new Redis(redisConfig, {
  retryStrategy: function(times) {
    var delay = Math.min(times * 50, 2000)
    return delay
  }
})

const redisConfigs = {
  redisClient() {
    return new Promise((resolve, reject) => {
      redis.ping().then(v => {
        if (v !== 'PONG') {
          reject('redis连接失败')
        }
        resolve('redis连接成功')
      })
    })
  },

  /**
   * 关闭redis连接
   */
  quit() {
    return new Promise((resolve, reject) => {
      redis.quit().then(rs => {
        if (!rs) {
          reject(rs)
        }
        resolve(rs)
      })
    })
  }
}
module.exports = {
  redis,
  redisConfigs
}
