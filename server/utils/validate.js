module.exports = (json) => {
  let message = "";
  let pattern = /^[a-zA-Z0-9_-]{6,16}$/;
  // let regTime=/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
  if (!json.username) {
    message = '用户名不能为空';
    return message;
  }
  if (!pattern.test(json.username)) {
    message = '用户名只能是6-16位';
    return message;
  }
  if (!json.groupId) {
    message = '用户组id为空';
    return message;
  }
  if(!json.status){
    message='请选择是否需要审核'
  }
  // if(!json.f_status){
  //   message='选择是否冻结状态'
  //   return message;
  // }
  // if(json.f_status==0){
  //   if(!json.end_freeze){
  //     message='请设置冻结结束时间'
  //     return message;
  //   }
  // }
  // if(!json.a_status){
  //   message='选择是否禁言状态'
  //   return message;
  // }
  // if(json.a_status==0){
  //   if(!json.end_anexcuse){
  //     message='请设置禁言结束时间'
  //     return message;
  //   }
  // }
}