const Router = require("koa-router");
const apiUser = require("../../models/admin/userManagement");
const redis = require('../../middleware/middleware_redis');
const checkToken = redis.authToken;
const checkMerchant = redis.LoginMerchant;

const adminUser=new Router({
  prefix:'/user'
})
//用户管理
adminUser
  //超级管理员操作功能
  .post('/addMerchant', checkToken, checkMerchant, apiUser.addMerchantApi) //新增品牌
  .get('/findMerchant', checkToken, checkMerchant, apiUser.findMerchantApi) //查找品牌
  .del('/delMerchant', checkToken, checkMerchant, apiUser.delMerchantApi) //删除品牌
  .post('/updateMerchant', checkToken, checkMerchant, apiUser.updateMerchantApi)//更新品牌状态
  //超级管理员及品牌管理员，品牌成员操作功能
  .post('/addUserGroup', checkToken,checkMerchant, apiUser.addUserGroupApi) //添加用户组
  .post('/updateGroup', checkToken,checkMerchant, apiUser.updateGroupApi) //修改用户组信息
  .get('/findGroupUser',checkToken,checkMerchant, apiUser.findGroupApi) //查询某个组成员
  .del('/delGroupUser',checkToken,checkMerchant,apiUser.delGroupApi) //删除用户组
  .post('/userManagement', checkToken, checkMerchant, apiUser.addUserApi) //添加用户
  .post('/userUpdate', checkToken, checkMerchant, apiUser.updateUserApi)  //更新用户信息
  .post('/userStatus',checkToken, checkMerchant, apiUser.UserStatusApi) //更新用户状态
  .del('/userDelete', checkToken,checkMerchant, apiUser.delUserApi) //删除用户
  .get('/userSearch', checkToken, checkMerchant, apiUser.searchUserApi) //搜索关键字
  .get('/findSingleUser', checkToken, apiUser.findSingleApi) //查询单个
  


module.exports = adminUser;