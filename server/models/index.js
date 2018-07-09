const users = require("./user/");
const admin = require("./admin/");
module.exports = {
  //前台api
  usersLogin: users.loginApi, //登录
  userRegister: users.registerApi, //注册
  userLogout: users.logoutApi, //退出
  //后台api
  addMerchant: admin.addMerchantApi, //新增merchant
  findMerchant: admin.findMerchantApi, //查找merchant
  delMerchant: admin.delMerchantApi, //删除merchant
  addUsers: admin.addUserApi, //添加用户
  delUsers: admin.delUserApi, //批量删除用户
  searchUser: admin.searchUserApi, //关键字搜索
  updateUser: admin.updateUserApi, //用户信息更新
  findSingle: admin.findSingleApi, //查找单个用户
  //findAll: admin.findUserAllApi, //查找所有用户
  addGroup: admin.addUserGroupApi  //添加用户组
}