module.exports = async (json) => {
  return new Promise((resolve, reject) => {
    let message = "";
    let pattern = /^[a-zA-Z0-9_-]{6,16}$/;
    if (!json.username) {
      message = '用户名不能为空';
      resolve(message);
    }
    if (!pattern.test(json.username)) {
      message = '用户名只能是6-16位';
      resolve(message);
    }
    if (!json.groupId) {
      message='用户组id为空';
      resolve(message);
    }
  })
}