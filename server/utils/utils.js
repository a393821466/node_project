//取ip地址
const getIp = req => {
  return (
    req.headers['x-forwarded-for'] ||
    req.remoteAddress ||
    req.remoteAddress ||
    req.socket.remoteAddress
  )
}

module.exports = {
  getIp
}
