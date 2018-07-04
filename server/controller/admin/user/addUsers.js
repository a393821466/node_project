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

  //添加用户功能
  static async addUser(ctx) {
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

    let valid = await validate(data);
    if (valid) {
      ctx.error(500, valid);
    }

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
  static async delUser(ctx) {
    let ids = ctx.request.body.id;
    if (!ids) {
      ctx.error(500, '没有可删除的');
    }
    let delBatch = await db.deleBatch(configdb.live_user, ids);
    if (!delBatch) {
      ctx.error(500, '删除出错了');
    }
    ctx.body = {
      success: true
    }
  }

  //输入框查询
  static async searchUser(ctx) {
    let query = ctx.query.value;
    let searchDB = '';
    let page = !ctx.query.page ? 1 : parseInt(ctx.query.page);
    let size = !ctx.query.pagesize ? 10 : parseInt(ctx.query.pagesize);

    if (!query) {
      searchDB = await db.findAll(configdb.live_user, page, size);
    } else {
      const dbTable = ['username', 'nicename', 'superior_user'];
      searchDB = await db.blurryFind(configdb.live_user, dbTable, query,page, size);
    }
    if (!searchDB) {
      ctx.error(500, '查询出错了');
    }
    for (var i = 0; i < searchDB.length; i++) {
      let finUsers = delete (searchDB[i].password);
    }
    ctx.body = {
      value: searchDB
    }
  }
}
module.exports = adminUser;