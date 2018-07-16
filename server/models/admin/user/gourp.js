const groups = require("../../sql/manageMent/group");
const userGroup = require("../../sql/manageMent/userGroup");
const redis = require("../../../redis");
const Merchant = require("../../sql/manageMent/merchant");
class group {
  /**
   * 添加用户组
   * @param {String} groupname 用户组名称
   * @param {String} merchantCode 用户组所在品牌code
   * @param {String} introduce 用户组描述
   * @param {String} icon 用户组图标
   */
  static async addGroup(ctx) {
    let token = ctx.request.header['authorization'],
      getUserMsg = await redis.getUser(token),
      userMessage = JSON.parse(getUserMsg),
      { groupname, merchantCode, introduce, icon } = ctx.request.body;
    console.log(userMessage)
    if (!groupname) {
      ctx.error(500, '组名称未填写');
    }
    let findMessage = await Merchant.findCode(merchantCode);
    if (findMessage.length == 0) {
      ctx.error(500, "没有该品牌");
    }
    let findGroup = await groups.findGroup("name", [groupname, merchantCode]);
    if (findGroup.length > 0) {
      ctx.error(500, '用户组名称已存在');
    }
    let createTime = Date.now(),
      data = [groupname, introduce, merchantCode, icon, '', createTime],
      addUserGroup = await groups.innsertGroup(data);
    if (!addUserGroup) {
      ctx.error(500, '添加用户组出错了');
    }
    ctx.body = {
      statusCode: true,
    }
  }
  /**
   * 修改用户组
   * @param {int} id 用户组ID
   * @param {String} merchantCode 用户组所在品牌code
   * @param {String} groupname 用户组名称
   * @param {String} introduce 用户组描述
   * @param {String} icon 用户组图标
   */
  static async upDateGroup(ctx) {
    let { id, merchantCode, groupname, introduce, icon } = ctx.request.body;
    if (!id) {
      ctx.error(400, '参数id不正确');
    }
    let findGroup = await groups.findGroup("name", [groupname, merchantCode]);
    // console.log(findGroup[0].introduce);
    let data = {
      groupname: !groupname ? findGroup[0].name : groupname,
      introduce: !introduce ? findGroup[0].introduce : introduce,
      icon: !icon ? findGroup[0].icon : icon,
      create_time: Date.now()
    }
    return groups.updateGroup([data.groupname, data.introduce, data.icon, data.create_time, id]).then(rs => {
      ctx.body = {
        statusCode: true
      }
    }).catch(xhr => {
      ctx.error(500, '系统繁忙,请稍后再试');
    })
  }

  /**
   * 查找用户组成员
   */
  static async findGroupUser(ctx){
    let params={
      id:!ctx.query.id?ctx.error(400,"参数id不正确"):ctx.query.id,
      page:!ctx.query.page?1:ctx.query.page,
      pagesize:!ctx.query.pagesize?10:ctx.query.pagesize
    }
    let data=[id,(params.page - 1) * params.pagesize,params.pagesize]
    return await userGroup.findGroupUser(data).then(rs=>{
      console.log(rs);
    })
  }
}

module.exports = group;