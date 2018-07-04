const db = require("../../../models/createDB");
const md5 = require("../../../middleware/md5");
const cfg = require("../../../config/config");
const validate = require("../../../utils/validate");
// const createToken = require('../../../middleware/createToken.js');
const configdb = cfg.db_sql;

class adminUser {
  static getInstance() {
    if (!this.instance) {
      this.instance = new adminUser();
    }
    return this.instance;
  }
  //添加用户
  static async addUser(ctx, next) {
    let query = ctx.request.body;
    let data = {
      username: query.username,
      password: !query.password ? "123456" : query.password,
      groupId: query.groupId,
      nicename: query.nicename,
      status: query.status,
      statusId: query.statusId,
      roomId: query.roomId,
      phone: query.phone,
      qq: query.qq,
      superior_user: query.superior_user,
      create_time: Date.now()
    }

    // validate(data).then(rs => {
    //   ctx.error(500, rs);
    // })

    let findUsername = await db.findData(configdb.live_user, data.username);
    if (findUsername.length > 0) {
      ctx.error(500, '用户名已存在');
    }
    let addUsername = await db.insertData([data.username, md5(md5(data.password) + 'maple'), data.groupId, data.nicename, "", data.status, data.statusId, data.roomId, data.phone, data.qq, data.superior_user, data.create_time])
    if (!addUsername) {
      ctx.error(500, "必填项未填写");
    }
    ctx.body = {
      success: true
    }
  }
  //批量删除用户
  static async delUser(ctx, next) {
    let ids = ctx.request.body.id;
    if (!ids) {
      ctx.error(500, '没有可删除的');
    }
    let delBatch = await db.deleBatch("live_user", ids);
    if (!delBatch) {
      ctx.error(500, '删除出错了');
    }
    ctx.body = {
      success: true
    }
  }
}
module.exports = adminUser;