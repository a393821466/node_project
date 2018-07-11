const groups = require("../../sql/manageMent/group");

class group {
  static async addGroup(ctx) {
    let merchant = ctx.request.header['merchant'];
    let { name, introduce, icon } = ctx.request.body;

    if (!name) {
      ctx.error(500, '用户组名称还未填写');
    }
    let findGroup = await groups.findGroup("name", name);
    if (findGroup.length > 0) {
      ctx.error(500, '用户组名称已存在');
    }
    let createTime = Date.now();
    let data = [name, introduce, merchant, icon, '', createTime];
    let addUserGroup = await groups.innsertGroup(data);
    if (!addUserGroup) {
      ctx.error(500, '添加用户组出错了');
    }
    ctx.body = {
      statusCode: true,
    }
  }
}

module.exports = group;