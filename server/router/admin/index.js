const Router = require("koa-router");
const apiUser = require("../../controller/");
const checkToken = require('../../middleware/authToken.js');
const adminApi = new Router({
  prefix: '/admin'
})

adminApi.post('/userManagement', apiUser.adminUser)

module.exports = adminApi;