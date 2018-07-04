const UserManage = require("./user/addUsers");

module.exports = {
  //用户管理
  addUserApi:UserManage.addUser,//添加用户
  delUserApi:UserManage.delUser, //批量删除用户
  searchUserApi:UserManage.searchUser //模糊搜索
}