const db = require("../../../models/createDB");
const md5 = require("../../../middleware/md5");
const configName = require("../../../config/config").checkList;
const validate = require("../../../utils/validate");
const createToken = require('../../../middleware/createToken.js');

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
    validate(data).then(ret => {
      ctx.status = 500;
      ctx.body = ret;
    })
    let findUsername = await db.findData(data.username);
    if (findUsername.length > 0) {
      ctx.error(500, '用户名已存在');
    }
    let addUsername = await db.insertData([data.username, md5(md5(data.password) + 'maple'), data.groupId, data.nicename, "", data.status, data.statusId, data.roomId, data.phone, data.qq, data.superior_user, data.create_time])
    if (!addUsername) {
      ctx.error(500, "必填项为填写");
    }
    ctx.body = {
      success: true
    }
  }
}
module.exports = adminUser;