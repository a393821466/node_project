exports.validateNull=function validateNull(str){
  let message = "";
  let pattern = /^[a-zA-Z0-9_-]{6,16}$/;
  if (!str.username) {
    message = '用户名不能为空';
    return message;
  }
  if (!pattern.test(str.username)) {
    message = '用户名只能是6-16位';
    return message;
  }
  if (!str.groupId) {
    message = '用户组id为空';
    return message;
  }
  if(!str.status){
    message='请选择是否需要审核'
  }
  if(!str.f_status){
    message='选择是否冻结状态'
    return message;
  }
  if(str.f_status==0){
    if(!str.end_freeze){
      message='请设置冻结结束时间'
      return message;
    }
  }
  if(!str.a_status){
    message='选择是否禁言状态'
    return message;
  }
  if(str.a_status==0){
    if(!str.end_anexcuse){
      message='请设置禁言结束时间'
      return message;
    }
  }
}

exports.validateRoomInfo=function validateRoomInfo(str){
  let patterns=/^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
  if(!str.room){
    message='请输入房间号';
    return message;
  }
  if(!str.title||!patterns.test(str.title)){
    message='请输入正确的房间标题';
    return message;
  }
}

exports.username = function username(str) {
  let pattern = /^[a-zA-Z0-9_-]{6,16}$/
  return pattern.test(str)
}

exports.merchantName = function merchantName(str) {
  let pattern = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
  return pattern.test(str)
}

exports.merchantCode= function merchantCode(str) {
  const merRegexp = /^(?!\d+$)[\da-zA-Z]+$/
  return merRegexp.test(str)
}