const user = require("./user");
const loginApi = user.userLogin,
  registerApi = user.userRegister,
  allUserApi=user.allUserApi;

module.exports = {
  loginApi,
  registerApi,
  allUserApi
}