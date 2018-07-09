const merchantDB = require('../../sql/manageMent/merchant');

class MerchantCode {
  //新增品牌
  static async addMerchant(ctx) {
    let { merchant } = ctx.request.body;
    let createTime = Date.now();
    if (!merchant) {
      ctx.error(500, '品牌未填写');
    }
    let findData = await merchantDB.findMerchant("merchant", merchant);
    if (findData.length > 0) {
      ctx.error(500, '品牌已存在');
    }
    let addMerchantCode = await merchantDB.innsertMerchant([merchant, createTime]);
    if (!addMerchantCode) {
      ctx.error(500, '新增品牌出错了')
    }
    ctx.body = {
      statusCode: true
    }
  }

  //查找品牌
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

  //删除品牌
  static async delMerchant(ctx) {
    let { id } = ctx.request.body;
    let delMerchant = await merchantDB.delMerchant(id);
    if (!delMerchant) {
      ctx.error(500, '系统繁忙，请稍后再试');
    }
    ctx.body = {
      statusCode: true
    }
  }
}
module.exports = MerchantCode;