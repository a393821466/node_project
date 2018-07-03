const users = require("./user/");
const admin = require("./admin/");
module.exports = {
  //注册登录api
  usersLogin: users.loginApi,
  userRegister: users.registerApi,
  userLogout: users.logoutApi,
  //后台api
  addUsers: admin.addUserApi,
  delUsers: admin.delUserApi

}