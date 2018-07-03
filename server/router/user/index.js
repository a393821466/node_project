const router = require("koa-router")();
const apiUser = require("../../controller/");
//登录&注册路由s
router.post("/login", apiUser.usersLogin)
  .post("/register", apiUser.userRegister);

module.exports = router;