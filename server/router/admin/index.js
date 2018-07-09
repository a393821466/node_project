const Router = require("koa-router");
const apiUser = require("../../models/");
const checkToken = require('../../redis').authToken;
const adminApi = new Router({
  prefix: '/api'
})
//用户管理
adminApi.post('/addMerchant', checkToken, apiUser.addMerchant) //新增merchant
  .get('/findMerchant', checkToken, apiUser.findMerchant) //查找merchant
  .del('/delMerchant', checkToken, apiUser.delMerchant) //删除merchant
  .post('/userManagement', checkToken, apiUser.addUsers) //添加用户
  .post('/userUpdate', checkToken, apiUser.updateUser)  //更新用户信息
  .del('/userDelete', checkToken, apiUser.delUsers) //删除用户
  .get('/userSearch', checkToken, apiUser.searchUser) //搜索关键字
  .get('/findSingleUser', checkToken, apiUser.findSingle) //查询单个
  .get('/findAllUser', checkToken, apiUser.findAll) //查询一堆
  .post('/addUserGroup', checkToken, apiUser.addGroup) //添加用户组



module.exports = adminApi;