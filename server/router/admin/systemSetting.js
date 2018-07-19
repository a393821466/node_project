const Router = require('koa-router')
const redis = require('../../middleware/middleware_redis')
const checkToken = redis.authToken
const checkMerchant = redis.LoginMerchant
const adminSetting = new Router({
  prefix: '/setting'
})

module.exports = adminSetting
