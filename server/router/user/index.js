const router = require("koa-router")();
const redisValidate = require('../../redis');
const checkToken = redisValidate.authToken;
const checkMerchant = redisValidate.LoginMerchant;
const noLoginCheck = redisValidate.noLoginMerchant;
const apiUser = require("../../models/");

router.post("/login", apiUser.usersLogin) //登录
  .post("/register", noLoginCheck, apiUser.userRegister) //注册
  .del("/logout", checkToken, checkMerchant, apiUser.userLogout); //退出

module.exports = router;