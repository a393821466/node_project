const user = require("./user");
const foreEnd = {
  loginApi: user.userLogin,
  registerApi: user.userRegister,
  logoutApi: user.userLogout
}
module.exports = foreEnd;