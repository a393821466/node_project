const groups = require('../../sql/manageMent/group')
const userGroup = require('../../sql/manageMent/userGroup')
const Merchant = require('../../sql/manageMent/merchant')
const cfg = require('../../../config/config').administrator
const redis = require('../../../config/redis.config').redis
class group {
  /**
   * 添加用户组
   * @param {String} groupname 用户组名称
   * @param {String} code 用户组所在品牌code
   * @param {String} introduce 用户组描述
   * @param {String} icon 用户组图标
   */
  static async addGroup(ctx) {
    // let token = ctx.request.header['authorization'],
    //   getUserMsg = await redis.getUser(token),
    //   userMessage = JSON.parse(getUserMsg),
    let { groupname, code, introduce, icon } = ctx.request.body
    if (!groupname) {
      ctx.error(400, '组名称未填写')
    }
    let findMessage = await Merchant.findCode(code)
    if (findMessage.length == 0) {
      ctx.error('没有该品牌')
    }
    let findGroup = await groups.findGroup('name', [groupname, code])
    if (findGroup.length > 0) {
      ctx.error('用户组名称已存在')
    }
    let createTime = Date.now(),
      data = [groupname, introduce, code, icon, '', createTime],
      addUserGroup = await groups.innsertGroup(data)
    if (!addUserGroup) {
      ctx.error()
    }
    ctx.body = {
      code: 2001,
      statusCode: true
    }
  }
  /**
   * 修改用户组
   * @param {int} id 用户组ID
   * @param {String} code 用户组所在品牌code
   * @param {String} groupname 用户组名称
   * @param {String} introduce 用户组描述
   * @param {String} icon 用户组图标
   */
  static async upDateGroup(ctx) {
    let { id, code, groupname, introduce, icon } = ctx.request.body
    if (!id || !code) {
      ctx.error(400, '参数不正确')
    }
    let findGroup = await groups.findGroup('id', [id, code])
    if (findGroup.length > 0) {
      if (findGroup[0].name == groupname) {
        ctx.error('用户组名称已存在')
      }
    }
    let data = {
      groupname: !groupname ? findGroup[0].name : groupname,
      introduce: !introduce ? findGroup[0].introduce : introduce,
      icon: !icon ? findGroup[0].icon : icon,
      create_time: Date.now()
    }
    return groups
      .updateGroup([
        data.groupname,
        data.introduce,
        data.icon,
        data.create_time,
        id
      ])
      .then(rs => {
        ctx.body = {
          code: 2001,
          statusCode: true
        }
      })
      .catch(xhr => {
        ctx.error()
      })
  }

  /**
   * 查找用户组成员
   */
  static async findGroupUser(ctx) {
    let params = {
      id: !ctx.query.id ? ctx.error(400, '参数id不正确') : ctx.query.id,
      page: !ctx.query.page ? 1 : ctx.query.page,
      pagesize: !ctx.query.pagesize ? 10 : parseInt(ctx.query.pagesize)
    }
    let data = [params.id, (params.page - 1) * params.pagesize, params.pagesize]
    return await userGroup
      .findGroupUser('limit', data)
      .then(rs => {
        ctx.body = {
          code: 2001,
          statusCode: true,
          value: rs
        }
      })
      .catch(xhr => {
        ctx.error()
      })
  }
  /**
   * 查询品牌用户组
   */
  static async findMerchantGroup(ctx) {
    let token = ctx.request.header['authorization'],
      authUser = await redis.get(token),
      userAdmin = JSON.parse(authUser),
      groupname = !ctx.query.groupname ? '' : ctx.query.groupname,
      page = !ctx.query.page ? 1 : parseInt(ctx.query.page),
      size = !ctx.query.pagesize ? 10 : parseInt(ctx.query.pagesize),
      code = ''
    if (userAdmin.merchant == cfg.merchant) {
      code = !ctx.query.code ? '' : ctx.query.code
    } else {
      code = !ctx.query.code ? userAdmin.merchant : ctx.query.code
    }
    await groups
      .findGroupMerchant(code, groupname, page, size)
      .then(rs => {
        ctx.body = {
          code: 2001,
          statusCode: true,
          value: rs
        }
      })
      .catch(xhr => {
        ctx.error()
      })
  }
  /**
   * 删除用户组
   */
  static async delUserGroup(ctx) {
    let ids = ctx.request.body.id
    if (!ids) ctx.error(400, '参数id不正确')
    let findGrousUser = await userGroup.findGroupUser('', ids)
    if (findGrousUser.length > 0) {
      ctx.error('需删除组下面所属用户')
    }
    return await groups
      .delGroup(ids)
      .then(rs => {
        ctx.body = {
          code: 2001,
          statusCode: true
        }
      })
      .catch(xhr => {
        ctx.error()
      })
  }
}

module.exports = group
