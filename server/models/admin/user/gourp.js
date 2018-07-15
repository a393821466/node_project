const groups = require("../../sql/manageMent/group");
const redis = require("../../../redis");
const Merchant = require("../../sql/manageMent/merchant");
class group {
  static async addGroup(ctx) {
    let token = ctx.request.header['authorization'],
      getUserMsg = await redis.getUser(token),
      userMessage = JSON.parse(getUserMsg),
      { groupname, merchant, introduce, icon } = ctx.request.body;
    if (!groupname) {
      ctx.error(500, '组名称未填写');
    }
    let findMessage = await Merchant.findCode(merchant);
    if (findMessage.length == 0) {
      ctx.error(500, "没有该品牌");
    }
    let findGroup = await groups.findGroup("name", [groupname, userMessage.merchant]);
    if (findGroup.length > 0) {
      ctx.error(500, '用户组名称已存在');
    }
    let createTime = Date.now(),
      data = [groupname, introduce, merchant, icon, '', createTime],
      addUserGroup = await groups.innsertGroup(data);
    if (!addUserGroup) {
      ctx.error(500, '添加用户组出错了');
    }
    ctx.body = {
      statusCode: true,
    }
  }
}

module.exports = group;