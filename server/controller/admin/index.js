const UserManage = require("./user/addUsers");

module.exports = {
  addUserApi:UserManage.addUser,//添加用户
  delUserApi:UserManage.delUser //批量删除用户
}