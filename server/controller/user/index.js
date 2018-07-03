const user = require("./user");
const loginApi = user.userLogin;
const registerApi = user.userRegister;
module.exports = {
  loginApi,
  registerApi
}