const MerchanCodes = require('./merchantCode')
const UserManage = require('./manageMent')
const UserGroup = require('./gourp')
const Menus = require('./menu')
const userManageCenter = {
  //用户管理
  addMerchantApi: MerchanCodes.addMerchant, //新增品牌
  findMerchantApi: MerchanCodes.findMerchant, //查找品牌
  // findAllMerchantApi:MerchanCodes.findAllMerchant, //查询所有品牌
  delMerchantApi: MerchanCodes.delMerchant, //删除品牌
  updateMerchantApi: MerchanCodes.updateMerchantStatus, //更改品牌状态
  addUserApi: UserManage.addUser, //添加用户
  delUserApi: UserManage.delUser, //批量删除用户
  searchUserApi: UserManage.searchUser, //关键字搜索
  updateUserApi: UserManage.updateUser, //更新用户信息
  UserStatusApi: UserManage.updateUserStatus, //更改用户状态
  addUserGroupApi: UserGroup.addGroup, //添加用户组
  updateGroupApi: UserGroup.upDateGroup, //修改用户组信息
  findGroupApi: UserGroup.findGroupUser, //查找组用户
  findMerchantGroupApi:UserGroup.findMerchantGroup, //查找品牌用户组
  delGroupApi: UserGroup.delUserGroup, //删除用户组
  getMenusApi: Menus.getMenu //获取菜单
}

module.exports = userManageCenter
