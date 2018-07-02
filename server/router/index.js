const router = require("koa-router")();
const apiUser = require("../controller/");
//路由管理
router.post("/login", apiUser.loginApi)
  .post("/register", apiUser.registerApi);

module.exports = router;