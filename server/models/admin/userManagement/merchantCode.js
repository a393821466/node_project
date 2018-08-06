const merchantDB = require('../../sql/manageMent/merchant')
const findUser = require('../../sql/manageMent/user')
const findGroup = require('../../sql/manageMent/group')
const insercode = require('../../sql/manageMent/domain')

class MerchantCode {
  /**
   * 添加品牌
   * @param {String} metchant 品牌名
   * @param {String} code  品牌别名
   */
  static async addMerchant(ctx) {
    let { merchant, code, status } = ctx.request.body
    let createTime = Date.now()
    if (!merchant || !code) {
      ctx.error(400, '请输入品牌及品牌别名')
    }
    let findData = await merchantDB.findMerchant([merchant, code])
    if (findData.length > 0) {
      ctx.error('品牌名或品牌别名已存在')
      return
    }
    let addMerchantCode = await merchantDB.innsertMerchant([
      merchant,
      code,
      status,
      createTime
    ])
    if (!addMerchantCode) {
      ctx.error('系统繁忙,请稍后再试')
    }
    await insercode.insertCode(code)
    ctx.body = {
      code: 2001,
      statusCode: true
    }
  }

  /**
   * 查找品牌
   * @param {String} merchant
   * 注:只接收品牌名参数
   */
  static async findMerchant(ctx) {
    let merchant = !ctx.query.merchant ? '' : ctx.query.merchant,
      code = !ctx.query.code ? '' : ctx.query.code,
      status = !ctx.query.status ? 0 : ctx.query.status,
      page = !ctx.query.page ? 1 : parseInt(ctx.query.page),
      size = !ctx.query.pagesize ? 10 : parseInt(ctx.query.pagesize),
      findMerchantCode = await merchantDB.blurryFind(merchant, code, status, page, size);
    if (!findMerchantCode) {
      ctx.error('服务器繁忙，请稍后再试')
    }
    let findAll = await merchantDB.findAll();
    let counts = findAll[0].count;
    // let pageSum = Math.ceil(counts / size)
    ctx.body = {
      statusCode: true,
      code: 2001,
      value: {
        data: findMerchantCode,
        page: page,
        pageSize: size,
        totelPage: counts
      },
    }
  }

  /**
   * 更改品牌状态或名字
   */
  static async updateMerchantStatus(ctx) {
    let { merchant, status, id } = ctx.request.body
    if (!id) {
      ctx.error(400, '参数错误')
    }
    await merchantDB
      .findId(id)
      .then(rs => {
        let data = {
          merchant: !merchant ? rs[0].merchant : merchant,
          status: !status ? rs[0].status : status
        }
        return data
      })
      .then(result => {
        merchantDB
          .updateMerchant([result.merchant, result.status, id])
          .then(res => {
            if (!res) {
              ctx.error('系统繁忙，请稍后再试')
            }
          })
      })
    ctx.body = {
      code: 2001,
      statusCode: true
    }
  }

  /**
   * 删除品牌
   * @param {String} code
   * 注:只接收品牌别名
   */
  static async delMerchant(ctx) {
    let { code } = ctx.request.body
    await findUser.findUserMerchant(code).then(rs => {
      if (rs.length > 0) {
        ctx.error('该品牌还有用户存在')
      }
    })
    await findGroup.findGroupMerchant(code).then(rs => {
      if (rs.length > 0) {
        ctx.error('该品牌还有用户组存在')
      }
    })
    let delMerchant = await merchantDB.delMerchant(code)
    if (!delMerchant) {
      ctx.error('系统繁忙，请稍后再试')
    }
    ctx.body = {
      code: 2001,
      statusCode: true
    }
  }
}
module.exports = MerchantCode
