const userRouter = require("./user/users");
const systemSetting = require("./admin/systemSetting");
const userManagement = require("./admin/userManagement");
const roomSetup = require("./admin/roomSetup");

module.exports = {
  userRouter,
  systemSetting,
  userManagement,
  roomSetup
};