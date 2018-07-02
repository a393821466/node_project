const jwt = require("jsonwebtoken");

module.exports = (user) => {
  const token = jwt.sign({
    user: user
  }, 'linklive', {
      expiresIn: '60s' //
    });
  return token;
}