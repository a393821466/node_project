const User = require('../../sql/manageMent/user')
const Group = require('../../sql/manageMent/group')
const Usergroup = require('../../sql/manageMent/userGroup')
const UserSubset = require('../../sql/manageMent/usersubset')
const md5 = require('../../../utils/md5')
const cfg = require('../../../config/config')
const validate = require('../../../utils/validate')
const redis = require('../../../redis').getUser
const formartDate = require('../../../utils/tool')
class adminUser {
  static getInstance() {
    if (!this.instance) {
      this.instance = new adminUser()
    }
    return this.instance
  }

  /**
   * @param {String} username 用户名
   * @param {String} password 密码
   * @param {number} groupId 用户组id
   * @param {String} nicename 名称
   * @param {number} status 审核状态
   * @param {number} frozenStatus 是否可登录
   * @param {String} roomId 房间id
   * @param {String} phone 手机号
   * @param {String} qq QQ
   * @param {String} superior_user 开户人用户名
   * @param {String} create_time 用户创建时间
   */
  static async addUser(ctx) {
    let query = ctx.request.body,
      data = {
        username: query.username,
        password: !query.password ? '123456' : query.password,
        groupId: query.groupId,
        nicename: query.nicename,
        code: query.code,
        status: query.status,
        f_status: query.f_status,
        a_status: query.a_status,
        roomId: query.roomId,
        phone: query.phone,
        qq: query.qq,
        superior_user: query.superior_user,
        end_anexcuse: !query.end_anexcuse
          ? 0
          : formartDate.timeFormart(query.end_anexcuse),
        end_freeze: !query.end_freeze
          ? 0
          : formartDate.timeFormart(query.end_freeze),
        create_time: Date.now()
      }
    // let time1 = data.end_anexcuse
    // let sum = formartDate.timeFormart(new Date()) >= time1
    // console.log(sum)

    let valid = await validate(data)
    if (valid) {
      ctx.error(500, valid)
    }
    if (cfg.checkList.indexOf(data.username) !== -1) {
      ctx.error(500, '不能使用该用户名注册')
    }
    let findUsername = await User.vaUserPswMerchant([
      data.username,
      md5(md5(data.password) + 'maple'),
      data.code
    ])
    if (findUsername.length > 0) {
      ctx.error(500, '用户名已存在')
    }
    let findUserGroup = await Group.findGroup('id', [data.groupId, data.code])
    if (findUserGroup.length == 0) {
      ctx.error(500, '没有该用户组')
    }
    if (findUserGroup[0].power) {
      ctx.error(500, '该用户组已禁止入驻用户')
    }
    let val = [
      data.username,
      md5(md5(data.password) + 'maple'),
      data.nicename,
      data.code,
      '',
      data.status,
      data.f_status,
      data.a_status,
      data.roomId,
      data.create_time
    ]
    await User.innsertUsername(val).then(result => {
      return result;
    }).then(result => {
      Usergroup.innsertGroup([result.insertId, findUserGroup[0].id]);
      return result;
    }).then(result => {
      UserSubset.subsetInsert([result.insertId, data.phone, data.qq, data.superior_user, data.end_anexcuse,  data.end_freeze])
    }).catch(er => {
      ctx.error(er)
    })
    ctx.body = {
      statusCode: true
    }
  }

  /**
   * 批量删除用户
   * @param {array OR number} id
   * 默认接收一个或多个id参数
   */
  static async delUser(ctx) {
    let ids = ctx.request.body.id,
      token = ctx.request.header['authorization'],
      findUser = await redis(token),
      params = JSON.parse(findUser).value[0].id
    if (ids.indexOf(params) > -1) {
      ctx.error(500, '不能删除自己')
    }
    if (!ids) {
      ctx.error(400, '参数id不正确')
    }
    await User.delUsername(ids)
    await Usergroup.delGroup(ids)
    ctx.body = {
      statusCode: true
    }
  }

  /**
   * 可查全部、可输入查询条件,可根据以下参数查询
   * @param {String} username 用户名
   * @param {number} groupId 用户组
   * @param {String} nicename 昵称
   * @param {number} status 是否审核
   * @param {String} roomId 房间号
   * @param {String} superior_user 开户人用户名
   */
  static async searchUser(ctx) {
    let username = !ctx.query.username ? '' : ctx.query.username,
      groupId = !ctx.query.groupId ? '' : ctx.query.groupId,
      nicename = !ctx.query.nicename ? '' : ctx.query.nicename,
      status = !ctx.query.status ? '' : ctx.query.status,
      roomId = !ctx.query.roomId ? '' : ctx.query.roomId,
      superior_user = !ctx.query.superior_user ? '' : ctx.query.superior_user,
      create_time = !ctx.query.create_time ? '' : ctx.query.create_time,
      page = !ctx.query.page ? 1 : parseInt(ctx.query.page),
      size = !ctx.query.pagesize ? 10 : parseInt(ctx.query.pagesize)

    let searchDB = await User.blurryFind(
      username,
      nicename,
      status,
      roomId,
      superior_user,
      create_time,
      page,
      size
    )
    let counts = 0
    if (
      !username &&
      !groupId &&
      !nicename &&
      !status &&
      !roomId &&
      !superior_user &&
      !create_time
    ) {
      let pageCount = await User.userCount()
      counts = pageCount[0].count
    } else {
      counts = searchDB.length
    }
    if (!searchDB) {
      ctx.error(500, '抱歉，查询功能偷了一下懒')
    }
    let pageSum = Math.ceil(counts / size) //总页数
    for (let i = 0; i < searchDB.length; i++) {
      delete searchDB[i].password
    }
    ctx.body = {
      statusCode: true,
      value: searchDB,
      page: page,
      pageSize: size,
      totelPage: pageSum
    }
  }

  /**
   * 查询单个用户信息
   * @param {number} id
   * 只接收一个用户ID
   */
  static async findSingleMsg(ctx) {
    let uId = ctx.query.id
    if (!uId) {
      ctx.error(400, '参数错误')
    }
    let findUser = await User.findUsername(uId)
    if (!findUser) {
      ctx.error(500, '抱歉,查询功能偷了一下懒')
    }
    delete findUser[0].password
    ctx.body = {
      statusCode: true,
      value: findUser
    }
  }

  //查询所有用户信息(已合并到按条件查询功能)
  // static async findUserAll(ctx) {
  //   let page = !ctx.query.page ? 1 : parseInt(ctx.query.page);
  //   let size = !ctx.query.pagesize ? 10 : parseInt(ctx.query.pagesize);
  //   let findAll = await db.blurryFind(configdb.live_user, page, size);
  //   let pageCount = await sqls(`select count(*) as count from ${configdb.live_user}`);
  //   // let pageSum = (pageCount[0].count + size - 1) / size;
  //   let pageSum = Math.ceil(pageCount[0].count / size);
  //   if (!findAll) {
  //     ctx.error(500, '抱歉,查询功能偷了一下懒');
  //   }
  //   for (let i = 0; i < findAll.length; i++) {
  //     delete (findAll[i].password)
  //   }
  //   ctx.body = {
  //     statusCode: true,
  //     value: findAll
  //   }
  // }

  /**
   * 更新用户信息
   * @param {number} id 用户id
   * @param {String} password 用户密码
   * @param {number} groupId 用户所在组
   * @param {String} nicename 昵称 用户昵称
   * @param {String} avator  用户头像
   * @param {String} phone 用户手机
   * @param {String} qq QQ
   * @param {number} status 审核状态
   * @param {String} roomId 审核状态
   */
  static async updateUser(ctx) {
    let {
      id,
      password,
      nicename,
      avator,
      phone,
      qq,
      status,
      roomId
    } = ctx.request.body
    if (!id) {
      ctx.error(500, '参数错误,id没传')
    }
    let findUser = await User.findUsername(id)
    if (!findUser) {
      ctx.error(500, '抱歉,系统开了个小差')
    }
    let passwords = !password
        ? findUser[0].password
        : md5(md5(password) + 'maple'),
      nicenames = !nicename ? findUser[0].nicename : nicename,
      avators = !avator ? findUser[0].avator : avator,
      phones = !phone ? findUser[0].phone : phone,
      qqs = !qq ? findUser[0].qq : qq,
      statuss = !status ? findUser[0].status : status,
      roomIds = !roomId ? findUser[0].roomId : roomId,
      value = [passwords, nicenames, avators, phones, qqs, statuss, roomIds]
    let updateDB = await User.updateUser(value, id)
    if (!updateDB) {
      ctx.error(500, '更新失败')
    }
    ctx.body = {
      statusCode: true
    }
  }
}
module.exports = adminUser
