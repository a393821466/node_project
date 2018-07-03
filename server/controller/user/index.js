const user = require("./user");
const loginApi = user.userLogin;
const registerApi = user.userRegister;
const logoutApi=user.userLogout;
module.exports = {
  loginApi,
  registerApi,
  logoutApi
}