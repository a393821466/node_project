const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');

//导入私钥
const privateKey = fs.readFileSync(path.join(__dirname, '../config/pem/private.key'));

//派发token
module.exports = (user) => {
  const token = jwt.sign(user, privateKey, { algorithm: 'RS256', expiresIn: '1day' });
  return token;
}