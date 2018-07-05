const users = require("./user/");
const admin = require("./admin/");
module.exports = {
  //注册登录api
  usersLogin: users.loginApi,
  userRegister: users.registerApi,
  userLogout: users.logoutApi,
  //后台api
  addUsers: admin.addUserApi, //添加用户
  delUsers: admin.delUserApi, //批量删除用户
  searchUser: admin.searchUserApi, //关键字搜索
  updateUser: admin.updateUserApi, //用户信息更新
  findSingle: admin.findSingleApi, //查找单个用户
  findAll: admin.findUserAllApi //查找所有用户
}