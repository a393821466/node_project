const crypto = require('crypto');

let pswMD5 = (psw) => {
  let md5 = crypto.createHash('md5');
  let password = md5.update(psw).digest("base64");
  return password;
}

module.exports = pswMD5;