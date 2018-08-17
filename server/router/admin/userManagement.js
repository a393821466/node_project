const Router = require('koa-router')
const apiUser = require('../../models/admin/userManagement')
const redis = require('../../middleware/redis')
const checkToken = redis.authToken
const checkMerchant = redis.LoginMerchant

const adminUser = new Router({
  prefix: '/user'
})
//用户管理
adminUser
  //超级管理员操作功能
  //新增品牌
  .post('/addMerchant', checkToken, checkMerchant, apiUser.addMerchantApi)
  //查找品牌
  .get('/findMerchant', checkToken, checkMerchant, apiUser.findMerchantApi)
  //查询所有品牌
  .get('/userSearch', checkToken, checkMerchant, apiUser.searchUserApi)
  //删除品牌
  .del('/delMerchant', checkToken, checkMerchant, apiUser.delMerchantApi)
  //更新品牌状态
  .post('/updateMerchant', checkToken, checkMerchant, apiUser.updateMerchantApi)
  //超级管理员及品牌管理员，品牌成员操作功能
  //添加用户组
  .post('/addUserGroup', checkToken, checkMerchant, apiUser.addUserGroupApi)
  //修改用户组信息
  .post('/updateGroup', checkToken, checkMerchant, apiUser.updateGroupApi)
  //查询品牌用户组
  .get('/findGroup', checkToken, checkMerchant, apiUser.findMerchantGroupApi)
  //查询某个组成员
  .get('/findGroupUser', checkToken, checkMerchant, apiUser.findGroupApi)
  //删除用户组
  .del('/delGroupUser', checkToken, checkMerchant, apiUser.delGroupApi)
  //添加用户
  .post('/userManagement', checkToken, checkMerchant, apiUser.addUserApi)
  //更新用户信息
  .post('/userUpdate', checkToken, checkMerchant, apiUser.updateUserApi)
  //更新用户状态
  .post('/userStatus', checkToken, checkMerchant, apiUser.UserStatusApi)
  //删除用户以及批量删除
  .post('/userDelete', checkToken, checkMerchant, apiUser.delUserApi)
  //搜索用户关键字
  .get('/userSearch', checkToken, checkMerchant, apiUser.searchUserApi)
  //添加导航
  .get('/findMenu', apiUser.getMenusApi)

module.exports = adminUser
