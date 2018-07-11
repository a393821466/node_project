const merchantDB = require('../../sql/manageMent/merchant');
const UpdateCode = require('../../sql/manageMent/domain');

class MerchantCode {
  /**
   * //添加品牌
   * @param {String} metchant 品牌名
   * @param {String} code  品牌别名
   */
  static async addMerchant(ctx) {
    let { merchant, code } = ctx.request.body;
    let createTime = Date.now();
    if (!merchant || !code) {
      ctx.error(500, '请输入品牌及品牌别名');
    }
    let findData = await merchantDB.findMerchant([merchant, code]);
    if (findData.length > 0) {
      ctx.error(500, '品牌名或品牌别名已存在');
    }
    let addMerchantCode = await merchantDB.innsertMerchant([merchant, code, createTime]);
    if (!addMerchantCode) {
      ctx.error(500, '系统繁忙,请稍后再试')
    }
    await UpdateCode.updateCode(code);
    ctx.body = {
      statusCode: true
    }
  }

  /**
   * 查找品牌
   * @param {String} merchant
   * 注:只接收品牌名参数 
   */
  static async findMerchant(ctx) {
    let merchantCode = !ctx.query.merchant ? "" : ctx.query.merchant;
    let page = !ctx.query.page ? 1 : parseInt(ctx.query.page);
    let size = !ctx.query.pagesize ? 10 : parseInt(ctx.query.pagesize);
    let findMerchantCode = await merchantDB.blurryFind(merchantCode, page, size);
    if (!findMerchantCode) {
      ctx.error(500, "服务器繁忙，请稍后再试");
    }
    ctx.body = {
      statusCode: true,
      value: findMerchantCode
    }
  }

  /**
   * 删除品牌
   * @param {String} code 
   * 注:只接收品牌别名
   */
  static async delMerchant(ctx) {
    let { code } = ctx.request.body;
    let delMerchant = await merchantDB.delMerchant(code);
    if (!delMerchant) {
      ctx.error(500, '系统繁忙，请稍后再试');
    }
    ctx.body = {
      statusCode: true
    }
  }
}
module.exports = MerchantCode;