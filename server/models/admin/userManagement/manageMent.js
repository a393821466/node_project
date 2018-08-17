const User = require('../../sql/manageMent/user')
const Group = require('../../sql/manageMent/group')
const Usergroup = require('../../sql/manageMent/userGroup')
const UserSubset = require('../../sql/manageMent/usersubset')
const md5 = require('../../../utils/md5')
const cfg = require('../../../config/config')
// const validate = require('../../../utils/validate')
const redis = require('../../../middleware/redis')
const upload = require('../../../utils/uploadImg')
const formartDate = require('../../../utils/tool')
class adminUser {
  static getInstance() {
    if (!this.instance) {
      this.instance = new adminUser()
    }
    return this.instance
  }

  /**
   * 添加用户
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
   * @param {Number} end_anexcuse 禁言状态
   * @param {Number} end_freeze 冻结状态
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
        roomId: query.roomId,
        phone: query.phone,
        qq: query.qq,
        avator:query.file,
        superior_user: query.superior_user,
        // formartDate.timeFormart(query.end_freeze),
        create_time: Date.now()
      }
    // let time1 = data.end_anexcuse
    // let sum = formartDate.timeFormart(new Date()) >= time1
    // console.log(sum)
    // let valid = await validate(data)
    // if (valid) {
    //   ctx.error(valid)
    // }
    let imgUrl='';
    if(!data.avator){
      imgUrl =''
    }else{
      imgUrl =await upload.authImg('userAvator', data.avator)
      if (!imgUrl) {
        ctx.error('上传出错了')
      }
    }
    if (cfg.checkList.indexOf(data.username) !== -1) {
      ctx.error('不能使用该用户名注册')
    }
    let findUsername = await User.vaUserPswMerchant([
      data.username,
      md5(md5(data.password) + 'maple'),
      data.code
    ])
    if (findUsername.length > 0) {
      ctx.error('用户名已存在')
    }
    let findUserGroup = await Group.findGroup('id', [data.groupId, data.code])
    if (findUserGroup.length == 0) {
      ctx.error('没有该用户组')
    }
    if (findUserGroup[0].power) {
      ctx.error('该用户组已禁止入驻用户')
    }
    let val = [data.username,md5(md5(data.password) + 'maple'),data.nicename,data.code,findUserGroup[0].name,imgUrl,data.status,1,1,data.roomId,data.create_time]
    await User.innsertUsername(val).then(result => {
      return result;
    }).then(result => {
      Usergroup.innsertGroup([result.insertId, findUserGroup[0].id]);
      return result;
    }).then(result => {
      UserSubset.subsetInsert([result.insertId, data.phone, data.qq, data.superior_user, 0,  0])
    }).catch(er => {
      ctx.error(er)
    })
    ctx.body = {
      code:2001,
      statusCode: true
    }
  }

  /**
   * 删除用户
   * @param {array OR number} id
   * 默认接收一个或多个id参数
   */
  static async delUser(ctx) {
    let ids = ctx.request.body.id,
      token = ctx.request.header['authorization'],
      findUser = await redis.getUser(token),
      params = JSON.parse(findUser)
    if (ids.indexOf(params) > -1) {
      ctx.error('不能删除自己')
    }
    if (!ids) {
      ctx.error('参数id不正确')
    }
    await User.delUsername(ids)
    await Usergroup.delGroup(ids)
    ctx.body = {
      code:2001,
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
   * @param {number} f_status 冻结状态(0:限时冻结,1:可登录,-1:永久状态)
   * @param {number} a_status 禁言状态(0:限时禁言,1:可发言,-1:永久禁言)
   * @param {String} merchant 品牌别名
   * @param {String} superior_user 开户人用户名
   */
  static async searchUser(ctx) {
    let username = !ctx.query.username ? '' : ctx.query.username,
      // groupId = !ctx.query.groupId ? '' : ctx.query.groupId,
      nicename = !ctx.query.nicename ? '' : ctx.query.nicename,
      status = !ctx.query.status ? '' : ctx.query.status,
      roomId = !ctx.query.roomId ? '' : ctx.query.roomId,
      f_status = !ctx.query.f_status ? '' : ctx.query.f_status,
      a_status = !ctx.query.a_status ? '' : ctx.query.a_status,
      groupName=!ctx.query.groupName ? '' : ctx.query.groupName,
      page = !ctx.query.page ? 1 : parseInt(ctx.query.page),
      size = !ctx.query.pagesize ? 10 : parseInt(ctx.query.pagesize),
      token = ctx.request.header['authorization'],
      authUser = await redis.getUser(token),
      userAdmin = JSON.parse(authUser);
    //查询数据库
    let searchDB = '';
    if(userAdmin.merchant==cfg.administrator.merchant){
      let merchant=!ctx.query.merchant ? '' : ctx.query.merchant
      searchDB=await User.blurryFind(username,nicename,status,roomId,f_status,a_status,merchant,groupName,page,size)
    }else{
      searchDB=await User.blurryFind(username,nicename,status,roomId,f_status,a_status,userAdmin.merchant,groupName,page,size)
    }
    let counts = 0
    if (!username &&!nicename &&!status &&!f_status&&!a_status&&!roomId&&!groupName) {
      //如果什么都没有，就查找全部
      let pageCount = await User.userCount()
      counts = pageCount[0].count
    } else {
      counts = searchDB.length
    }
    if (!searchDB) {
      ctx.error('抱歉，查询功能偷了一下懒')
    }
    // let pageSum = Math.ceil(counts / size) //总页数
    for (let i = 0; i < searchDB.length; i++) {
      delete searchDB[i].password
    }
    ctx.body = {
      code:2001,
      statusCode: true,
      value:{
        data:searchDB,
        page: page,
        pageSize: size,
        totelPage: counts
      }
    }
  }

  /**
   * 查询单个用户信息
   * @param {number} id
   * 只接收一个用户ID
   */
  // static async findSingleMsg(ctx) {
  //   let uId = ctx.query.id
  //   if (!uId) {
  //     ctx.error('参数id错误')
  //   }
  //   let findUser = await User.findUsername(uId)
  //   if (!findUser) {
  //     ctx.error('抱歉,查询功能偷了一下懒')
  //   }
  //   delete findUser[0].password
  //   ctx.body = {
  //     statusCode: true,
  //     value: findUser
  //   }
  // }

  /**
   * 更新用户信息
   * @param {Number} id 用户id
   * @param {String} password 用户密码
   * @param {Number} groupId 用户所在组
   * @param {String} nicename 昵称 用户昵称
   * @param {String} avator  用户头像
   * @param {String} phone 用户手机
   * @param {String} qq QQ
   * @param {Number} status 审核状态
   * @param {String} roomId 房间号
   */
  static async updateUser(ctx) {
    let {id,password,nicename,avator,phone,qq,status,roomId} = ctx.request.body
    if (!id) {
      ctx.error(400, '参数id错误')
    }
    let findUser = await User.findUsername(id)
    if (!findUser) {
      ctx.error('抱歉,系统开了个小差')
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
      // end_anexcuses=!end_anexcuse? 0: formartDate.timeFormart(end_anexcuse),
      // end_freezes=!end_freeze? 0:formartDate.timeFormart(end_freeze),
      value = [passwords, nicenames, avators, statuss, roomIds,id]
     
      let userDit=await User.updateUser(value);
      if(!userDit){
        if(!rs){
          ctx.error('更新资料失败');
        }
      }
    await UserSubset.updateTable([phones,qqs,id]);
    ctx.body = {
      code:2001,
      statusCode: true
    }
  }

  /**
   * 更新用户状态
   * @param {Number} id 用户id
   * @param {Number} f_status 冻结状态
   * @param {Number} a_status 禁言状态
   * @param {Number} end_anexcuse 冻结时间
   * @param {Number} end_freeze 禁言时间
   */
  static async updateUserStatus(ctx){
    let query=ctx.request.body;
    let ids=!query.id?ctx.error(400,'参数id错误'):query.id;
    let findUser=await User.findUsername(ids);
    if(!findUser){
      ctx.error()
    }
    let data={
      f_status:!query.f_status?findUser[0].f_status:query.f_status,
      a_status:!query.a_status?findUser[0].f_status:query.a_status,
      end_anexcuse:!query.end_anexcuse?0: formartDate.timeFormart(query.end_anexcuse),
      end_freeze:!query.end_freeze?0:formartDate.timeFormart(query.end_freeze)
    }
    if(data.a_status==0 && !data.end_anexcuse){
      ctx.error('禁言时间为空');
    }
    if(data.f_status==0 && !data.end_freeze){
      ctx.error('冻结时间为空');
    }
    let BsetUser=()=>{
      return new Promise((resolve,reject)=>{
        UserSubset.findUserBset('findStatus',ids).then(rs=>{
          if(!rs){
            reject(rs)
          }
          resolve(rs);
        })
      })
    }
    BsetUser().then(result=>{
      return true;
    }).catch(err=>{
      ctx.error(err);
    })
    await User.updateUserStatus([data.f_status,data.a_status,ids]).then(rs=>{
      if(!rs){
        ctx.error()
      }
      return true;
    })
    let SubsetUser=await UserSubset.updateUserTime([data.end_anexcuse,data.end_freeze,ids]);
    if(!SubsetUser){
      ctx.error();
    }
    ctx.body={
      code:2001,
      statusCode:true
    }
  }
}
module.exports = adminUser
