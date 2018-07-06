const db = require("../../sql/single_table_DB");
const sqls = require("../../sql/connect").do;
const md5 = require("../../../middleware/md5");
const cfg = require("../../../config/config");
const validate = require("../../../utils/validate");
const configdb = cfg.db_sql;

class adminUser {
  static getInstance() {
    if (!this.instance) {
      this.instance = new adminUser();
    }
    return this.instance;
  }

  /**
   * @param {username、password、groupId、nicename、status、statusId、roomId、phone、qq、superior_user、create_time} 用户名、密码、用户组、昵称、是否审核、是否可登陆、房间ID、手机
   * QQ、开户人、创建时间 
   */
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
    let findUsername = await db.findData(configdb.live_user, "username", data.username);
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

  /**
   * 批量删除用户
   * @param {String} id 
   * 默认接收一个或多个id参数
   */
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

  /**
   * 可查全部、可输入查询条件,可根据以下参数查询
   * @param {username、groupId、nicename、status、roomId、superior_user} 用户名、用户组、昵称、是否审核、房间号、开户人 
   */
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
    let counts = 0;
    if (!username && !groupId && !nicename && !status && !roomId && !superior_user && !create_time) {
      let pageCount = await sqls(`select count(*) as count from ${configdb.live_user}`);
      counts = pageCount[0].count;
    } else {
      counts = searchDB.length;
    }
    if (!searchDB) {
      ctx.error(500, '抱歉，查询功能偷了一下懒');
    }
    let pageSum = Math.ceil(counts / size); //总页数
    for (let i = 0; i < searchDB.length; i++) {
      delete (searchDB[i].password)
    }
    ctx.body = {
      code: true,
      value: searchDB,
      page: page,
      pageSize: size,
      totelPage: pageSum
    }
  }

  /**
   * 查询单个用户信息
   * @param {String} id
   * 只接收一个用户ID 
   */
  static async findSingleMsg(ctx) {
    let uId = ctx.query.id;
    if (!uId) {
      ctx.error(400, "参数错误");
    }
    let findUser = await db.findData(configdb.live_user, "id", uId);
    if (!findUser) {
      ctx.error(500, '抱歉,查询功能偷了一下懒');
    }
    let finUsers = delete (findUser[0].password);
    ctx.body = {
      code: true,
      value: findUser
    }
  }

  //查询所有用户信息(已合并到按条件查询功能)
  static async findUserAll(ctx) {
    let page = !ctx.query.page ? 1 : parseInt(ctx.query.page);
    let size = !ctx.query.pagesize ? 10 : parseInt(ctx.query.pagesize);
    let findAll = await db.blurryFind(configdb.live_user, page, size);
    let pageCount = await sqls(`select count(*) as count from ${configdb.live_user}`);
    // let pageSum = (pageCount[0].count + size - 1) / size;
    let pageSum = Math.ceil(pageCount[0].count / size);
    if (!findAll) {
      ctx.error(500, '抱歉,查询功能偷了一下懒');
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
    let { id, password, groupId, nicename, avator, phone, qq, status, roomId } = ctx.request.body;
    if (!id) {
      ctx.error(500, '参数错误,id没传');
    }
    let findUser = await db.findData(configdb.live_user, "id", id);
    if (!findUser) {
      ctx.error(500, '抱歉,系统开了个小差');
    }
    let passwords = !password ? findUser[0].password : md5(md5(password) + 'maple'),
      groupIds = !groupId ? findUser[0].groupId : groupId,
      nicenames = !nicename ? findUser[0].nicename : nicename,
      avators = !avator ? findUser[0].avator : avator,
      phones = !phone ? findUser[0].phone : phone,
      qqs = !qq ? findUser[0].qq : qq,
      statuss = !status ? findUser[0].status : status,
      roomIds = !roomId ? findUser[0].roomId : roomId,
      valName = ["password", "groupId", "nicename", "avator", "phone", "qq", "status", "roomId"],
      value = [passwords, groupIds, nicenames, avators, phones, qqs, statuss, roomIds,]
    let updateDB = await db.upDatedata(configdb.live_user, valName, value, id)
    if (!updateDB) {
      ctx.error(500, '更新失败');
    }
    ctx.body = {
      code: true
    }
  }
}
module.exports = adminUser;