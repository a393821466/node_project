const sqls = require("../../sql/connect").do;

class userGroup {
  static async addGroup(ctx) {
    let { name, introduce, icon } = ctx.request.body;
    if (!name) {
      ctx.error(500, '用户组名称还未填写');
    }
    let findGroup = await db.findData("live_group", "name", name);
    if (findGroup.length > 0) {
      ctx.error(500, '用户组名称已存在');
    }
    let createTime = Date.now();
    let data = [name, introduce, '', icon, '', createTime];
    let addUserGroup = sqls(`insert into live_group(name,introduce,merchant,icon,power,create_time) values(?,?,?,?,?,?)`, data);
    if (!addUserGroup) {
      ctx.error(500, '添加用户组出错了');
    }
    ctx.body = {
      statusCode: true,
    }
  }
}

module.exports = userGroup;