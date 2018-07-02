const router = require("koa-router")();
const apiUser = require("../controller/");
const checkToken = require('../middleware/auth.js');

//路由管理
router.post("/login", apiUser.loginApi)
  .post("/register", apiUser.registerApi)
  .get("/allUser", checkToken, apiUser.allUserApi);

module.exports = router;