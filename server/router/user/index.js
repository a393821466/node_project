const router = require("koa-router")();
const redisValidate = require('../../redis');
const checkToken = redisValidate.authToken;
const checkMerchant = redisValidate.LoginMerchant;
const noLoginCheck = redisValidate.noLoginMerchant;
const apiUser = require("../../models/user");

router.post("/login", apiUser.loginApi) //登录
  .post("/register", noLoginCheck, apiUser.registerApi) //注册
  .del("/logout", checkToken, checkMerchant, apiUser.logoutApi); //退出

module.exports = router;