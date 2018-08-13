const fs = require('fs')
const fileType = require('file-type')
const domainUrl=require('../config/config').domain;

module.exports = {
  uploadImg(uploads, dataBuffer, type) {
    var name = Date.now() + '.' + type
    var url = __dirname + `/../public/uploads/${uploads}/` + name
    return new Promise(function(resolve, reject) {
      fs.writeFile(url, dataBuffer, function(err) {
        if (err) {
          reject(err)
        } else {
          resolve(`${domainUrl}/uploads/${uploads}/` + name)
        }
      })
    })
  },
  async authImg(uploadFile, filetype) {
    let base64Data = filetype.replace(/^data:image\/\w+;base64,/, '')
    let type = filetype.replace(/data:image\/([^;]+).*/i, '$1') //取类型
    let dataBuffer = new Buffer(base64Data, 'base64')
    let imgType = fileType(dataBuffer)
    if (
      imgType.ext !== 'jpg' &&
      imgType.ext !== 'png' &&
      imgType.ext !== 'jpeg' &&
      imgType.ext !== 'gif'
    ) {
      return '5001'
    }
    var filesImg = await this.uploadImg(uploadFile, dataBuffer, type)
    if (!filesImg) {
      return '5002'
    }
    return filesImg;
  }
}