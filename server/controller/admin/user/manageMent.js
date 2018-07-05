const db = require("../../../models/createDB");
const md5 = require("../../../middleware/md5");
const cfg = require("../../../config/config");
const validate = require("../../../utils/validate");
const sqls = require("../../../models/connect").do;
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
      code: true
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
      code: true
    }
  }

  //输入框查询
  static async searchUser(ctx) {
    let username = !ctx.query.username ? "" : ctx.query.username;
    let groupId = !ctx.query.groupId ? "" : ctx.query.groupId;
    let nicename = !ctx.query.nicename ? "" : ctx.query.nicename;
    let status = !ctx.query.status ? "" : ctx.query.status;
    let roomId = !ctx.query.roomId ? "" : ctx.query.roomId;
    let superior_user = !ctx.query.superior_user ? "" : ctx.query.superior_user;
    let create_time = !ctx.query.create_time ? "" : ctx.query.create_time;
    let page = !ctx.query.page ? 1 : parseInt(ctx.query.page);
    let size = !ctx.query.pagesize ? 10 : parseInt(ctx.query.pagesize);
    let table = ['username', 'groupId', 'nicename', 'status', 'roomId', 'superior_user', 'create_time'];
    let searchDB = await db.blurryFind(configdb.live_user, table, username, groupId, nicename, status, roomId, superior_user, create_time, page, size);
    if (!searchDB) {
      ctx.error(500, '查询出错了');
    }
    for (var i = 0; i < searchDB.length; i++) {
      let finUsers = delete (searchDB[i].password);
    }
    ctx.body = {
      code: true,
      value: searchDB
    }
  }

  //查询单个用户信息
  static async findSingleMsg(ctx) {
    let uId = ctx.query.id;
    if (!uId) {
      ctx.error(400, "参数错误");
    }
    let findUser = await db.findData(configdb.live_user, "id", uId);
    if (!findUser) {
      ctx.error(500, '抱歉,系统开了个小差');
    }
    let finUsers = delete (findUser[0].password);
    ctx.body = {
      code: true,
      value: findUser
    }
  }

  //查询所有用户信息
  static async findUserAll(ctx) {
    let page = !ctx.query.page ? 1 : parseInt(ctx.query.page);
    let size = !ctx.query.pagesize ? 10 : parseInt(ctx.query.pagesize);
    let findAll = await db.findAll(configdb.live_user, page, size);
    let pageCount = await sqls(`select count(*) as count from ${configdb.live_user}`);
    // let pageSum = (pageCount[0].count + size - 1) / size;
    let pageSum = Math.ceil(pageCount[0].count / size);
    if (!findAll) {
      ctx.error(500, '抱歉,系统开了个小差');
    }
    for (let i = 0; i < findAll.length; i++) {
      delete (findAll[i].password)
    }
    ctx.body = {
      code: true,
      value: findAll
    }
  }

  //更新用户信息
  static async updateUser(ctx) {
    let { password, groupId, nicename, avator, phone, qq, status, roomId } = ctx.request.body;
    // let findOld=await db.fin
    let passwords = !password ? "" : password;
    groupIds = !groupId ? "" : groupId,
      nicenames = !nicename ? "" : nicename,
      avators = !avator ? "" : avator,
      phones = !phone ? "" : phone,
      qqs = !qq ? "" : qq,
      statuss = !status ? "" : status,
      roomIds = !roomId ? "" : roomId,
      valName = ["password", "groupId", "nicename", "avator", "phone", "qq", "status", "roomId"],
      value = [passwords, groupIds, nicenames, avators, phones, qqs, statuss, roomIds,]
    let updateDB = await db.upDatedata(configdb.live_user, valName, value, )
  }
}
module.exports = adminUser;