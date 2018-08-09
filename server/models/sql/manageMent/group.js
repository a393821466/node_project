const sqls = require('../connect').do
//查找品牌内用户组
const findGroupMerchant = (val1, val2, page, size) => {
  let arr = []
  let _sql = `select * from live_group where 1=1 `
  if (val1 != '') {
    val1 = '%' + val1 + '%'
    _sql += `and merchant like ? `
    arr.push(val1)
  }
  if (val2 != '') {
    val1 = '%' + val2 + '%'
    _sql += `and name like ? `
    arr.push(val2)
  }
  _sql += `ORDER BY create_time,id limit ?,?`
  arr.push((page - 1) * size, size)
  return sqls(_sql, arr)
}

//查找用户组条数
const groupCount = (value) => {
  let _sql = ''
  if (value[0] == '' && value[1] == '') {
    _sql = `select count(*) as count from live_group`
    return sqls(_sql)
  } else {
    _sql = `select count(*) as count from live_group where merchant=? or name=?`
    return sqls(_sql, value)
  }
}

//查找单个用户组
const findGroup = (type, value) => {
  let _sql = ''
  if (type == 'id') {
    _sql = `select * from live_group where id=? and merchant=?`
  }
  if (type == 'name') {
    _sql = `select * from live_group where name=? and merchant=?`
  }
  return sqls(_sql, value)
}

//插入用户组
const innsertGroup = val => {
  let _sql = `insert into live_group(name, introduce, merchant, icon,power, create_time) values(?,?,?,?,?,?)`
  return sqls(_sql, val)
}

//更新用户组信息
const updateGroup = val => {
  let _sql = `update live_group set name=?, introduce=? ,icon=? ,create_time=? where id=?`
  return sqls(_sql, val)
}


//删除用户组
const delGroup = ids => {
  let params = []
  let _sql = `delete from live_group where id in (`
  for (let i = 0; i < ids.length; i++) {
    params.push(ids[i])
  }
  for (let i = 0; i < ids.length - 1; i++) {
    _sql = _sql + ids[i]
  }
  _sql = _sql + ids[ids.length - 1] + `)`
  return sqls(_sql, params)
}

module.exports = {
  findGroupMerchant,
  findGroup,
  innsertGroup,
  updateGroup,
  delGroup,
  groupCount
}
