const Router = require('koa-router')
const redis = require('../../middleware/redis')
const checkToken = redis.authToken
const checkMerchant = redis.LoginMerchant
const adminSetting = new Router({
  prefix: '/setting'
})
// adminSetting.post('/addNotice')

module.exports = adminSetting
