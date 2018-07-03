const users = require("./user/");
const admin = require("./admin/");
module.exports = {
  //注册登录api
  usersLogin: users.loginApi,
  userRegister: users.registerApi,
  //后台api
  adminUser: admin.addUserApi,

}