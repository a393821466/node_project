const router = require("koa-router")();
const checkToken = require('../../redis').authToken;
const apiUser = require("../../models/");

router.post("/login", apiUser.usersLogin) //登录
  .post("/register", apiUser.userRegister) //注册
  .del("/logout", checkToken, apiUser.userLogout); //退出

module.exports = router;