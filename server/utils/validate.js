module.exports = (json) => {
  let message = "";
  let pattern = /^[a-zA-Z0-9_-]{6,16}$/;
  let regTime=/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
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
}