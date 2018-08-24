const Router = require('koa-router')
const redis = require('../../middleware/redis')
const checkToken = redis.authToken
const checkMerchant = redis.LoginMerchant
const rooms=require('../../models/admin/roomManagement')
const adminSetup = new Router({
  prefix: '/room'
})
adminSetup.post('/addroom',checkToken,checkMerchant,rooms.addRoomApi)

module.exports = adminSetup
