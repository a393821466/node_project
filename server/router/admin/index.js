const Router = require("koa-router");
const apiUser = require("../../models/");
const redis = require('../../redis');
const checkToken = redis.authToken;
const checkMerchant = redis.LoginMerchant;
const adminApi = new Router({
  prefix: '/api'
})
//用户管理
adminApi
  //超级管理员操作功能
  .post('/addMerchant', checkToken,checkMerchant, apiUser.addMerchant) //新增merchant
  .get('/findMerchant', checkToken,checkMerchant, apiUser.findMerchant) //查找merchant
  .del('/delMerchant', checkToken,checkMerchant, apiUser.delMerchant) //删除merchant
  //超级管理员及品牌管理员，品牌成员操作功能
  .post('/userManagement', checkToken,checkMerchant, apiUser.addUsers) //添加用户
  .post('/userUpdate', checkToken,checkMerchant, apiUser.updateUser)  //更新用户信息
  .del('/userDelete', checkToken, apiUser.delUsers) //删除用户
  .get('/userSearch', checkToken, apiUser.searchUser) //搜索关键字
  .get('/findSingleUser', checkToken, apiUser.findSingle) //查询单个
  //.get('/findAllUser', checkToken, apiUser.findAll) //查询一堆
  .post('/addUserGroup', checkToken, apiUser.addGroup) //添加用户组



module.exports = adminApi;