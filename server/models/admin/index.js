const UserManage = require("./user/manageMent");

module.exports = {
  //用户管理
  addUserApi: UserManage.addUser,//添加用户
  delUserApi: UserManage.delUser, //批量删除用户
  searchUserApi: UserManage.searchUser, //关键字搜索
  updateUserApi: UserManage.updateUser, //更新用户信息
  findSingleApi: UserManage.findSingleMsg, //查找单个用户
  findUserAllApi: UserManage.findUserAll //查找所有用户
}