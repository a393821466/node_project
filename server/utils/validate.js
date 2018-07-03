module.exports = async (json) => {
  return new Promise((resolve, reject) => {
    let da = {};
    let pattern = /^[a-zA-Z0-9_-]{6,16}$/;
    if (!json.username) {
      da = {
        errorCode: 'USERNAME_NULL',
        message: '用户名不能为空'
      }
      resolve(da);
    }
    if (!pattern.test(json.username)) {
      da = {
        errorCode: 'USERNAME_FORMART_ERR',
        message: '用户名只能是6-16位'
      }
      resolve(da);
    }
  })
}