const Router = require("koa-router");
const apiUser = require("../../controller/");
const checkToken = require('../../middleware/authToken.js');
const adminApi = new Router({
  prefix: '/admin'
})

adminApi.post('/userManagement', checkToken, apiUser.addUsers)
  .del('/userDelete',checkToken, apiUser.delUsers)

module.exports = adminApi;