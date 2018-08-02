const menuSql = require('../../sql/manageMent/menu')

class menuManage {
  static async addMenu(ctx) {
    let query = ctx.request.body
    // let params={
    //   parentName:!query.p_name?"":query.p_name, //如果一级菜单可以省略
    //   parentPath:!query.p_path?"":query.p_path, //如果一级菜单可以省略
    //   parentRedirect:!query.p_redirect?ctx.error('未填写导航视图文件'):query.p_component, //重定向至哪个路径(必须)
    //   parentComponent:!query.p_component?ctx.error('未填写导航视图文件'):query.p_component,
    //    //路由视图名称(必须)
    //   parentTitle:!query.p_title?"":query.p_title,  //父级路由名字(必须)
    //   parentIcon:!query.p_icon?"":query.p_icon, //父级路由图标
    //   parentHidden:query.hidden,
    //   subPath:query.subpath,  //子级路由路径(必须)
    //   subName:query.subname,  //子级路由name
    //   subComponent:query.subcomponent, //子级跳转视图路径
    //   subTitle:query.subtitle, //子级路由标题
    //   subIcon:!query.subIcon?"":query.subIcon //子级路由图标
    // }
    // let addParentMenu=await menuSql.addparentNav([params.parentName,params.parentPath,params.parentRedirect,params.parentComponent,params.parentTitle,params.parentIcon,params.parentHidden]);
    // if(!addParentMenu){
    //   ctx.error('系统繁忙,请稍后再试');
    // }
    // console.log(addParentMenu)
  }
  static async getMenu(ctx) {
    let findMenuList = await menuSql.findMenuSub()
    const temp_parent = { id: 0, meta: {}, children: [] } //新建id为null的对象做为森林的根
    let result = []
    let allMenu = findMenuList
    result.push(temp_parent)
    let output = getAllChild(result)
    //查找父级
    function findItemChild(item) {
      let arrayList = []
      for (let i in allMenu) {
        if (allMenu[i].parent_id == item.id) {
          allMenu[i].meta = {
            title: allMenu[i].title,
            icon: allMenu[i].icon
          }
          delete allMenu[i].title
          delete allMenu[i].icon
          arrayList.push(allMenu[i])
        }
      }
      return arrayList
    }
    //得到所有子集
    function getAllChild(array) {
      let childList = findItemChild(array[0])
      if (childList == 0) {
        return []
      } else {
        for (let j in childList) {
          childList[j].children = []
          childList[j].children = getAllChild([childList[j]])
          if (childList[j].children.length == 0) {
            delete childList[j].children
          }
        }
        array[0].children = childList
      }
      return childList
    }
    if (output.length == 0) {
      return (ctx.body = [])
    } else {
      ctx.body = {
        code: 2001,
        data: {
          router: output
        }
      }
    }
  }
}

module.exports = menuManage
