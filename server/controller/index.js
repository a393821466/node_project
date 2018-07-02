const user = require("./user");
const loginApi = user.userLogin,
  registerApi = user.userRegister;

module.exports = {
  loginApi,
  registerApi
}