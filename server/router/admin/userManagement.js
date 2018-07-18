const router = require("koa-router")();
const apiUser = require("../../models/admin/user");
const redis = require('../../middleware/middleware_redis');
const checkToken = redis.authToken;
const checkMerchant = redis.LoginMerchant;

//用户管理
router
  //超级管理员操作功能
  .post('/userApi/addMerchant', checkToken, checkMerchant, apiUser.addMerchantApi) //新增品牌
  .get('/userApi/findMerchant', checkToken, checkMerchant, apiUser.findMerchantApi) //查找品牌
  .del('/userApi/delMerchant', checkToken, checkMerchant, apiUser.delMerchantApi) //删除品牌
  .post('/userApi/updateMerchant', checkToken, checkMerchant, apiUser.updateMerchantApi)//更新品牌状态
  //超级管理员及品牌管理员，品牌成员操作功能
  .post('/userApi/addUserGroup', checkToken,checkMerchant, apiUser.addUserGroupApi) //添加用户组
  .post('/userApi/updateGroup', checkToken,checkMerchant, apiUser.updateGroupApi) //修改用户组信息
  .get('/userApi/findGroupUser',checkToken,checkMerchant, apiUser.findGroupApi) //查询某个组成员
  .del('/userApi/delGroupUser',checkToken,checkMerchant,apiUser.delGroupApi) //删除用户组
  .post('/userApi/userManagement', checkToken, checkMerchant, apiUser.addUserApi) //添加用户
  .post('/userApi/userUpdate', checkToken, checkMerchant, apiUser.updateUserApi)  //更新用户信息
  .del('/userApi/userDelete', checkToken, apiUser.delUserApi) //删除用户
  .get('/userApi/userSearch', checkToken, checkMerchant, apiUser.searchUserApi) //搜索关键字
  .get('/userApi/findSingleUser', checkToken, apiUser.findSingleApi) //查询单个
  //.get('/userApi/findAllUser', checkToken, apiUser.findAll) //查询一堆
  


module.exports = router;