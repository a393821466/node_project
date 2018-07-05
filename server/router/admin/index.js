const Router = require("koa-router");
const apiUser = require("../../controller/");
const checkToken = require('../../redis').authToken;
const adminApi = new Router({
  prefix: '/admin'
})

adminApi.post('/userManagement', checkToken, apiUser.addUsers)
  .post('/userUpdate', checkToken, apiUser.updateUser)
  .del('/userDelete', checkToken, apiUser.delUsers)
  .get('/userSearch', checkToken, apiUser.searchUser)
  .get('/findSingleUser', checkToken, apiUser.findSingle)
  .get('/findAllUser', checkToken, apiUser.findAll)



module.exports = adminApi;