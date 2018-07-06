## 项目是个只返回API、无前端页面:

### 1. 整个项目的文件夹结构
>server整个程序主文件夹
>>config程序配置文件夹
>>>controller逻辑处理文件夹(控制器)
>>>>middleware辅助中间件
>>>>>models数据层处理
>>>>>>public静态资源处理
>>>>>>>router路由中间件
>>>>>>>>test单元测试(还未开始处理)
>>>>>>>>>utils工具包

<br />

### 2. 完成度
* 前台API
  * 登录  API地址 /login
  * 注册  API地址 /register
  * 退出  API地址 /logout

* 后台API
  * 用户管理
    * 新增用户 API地址 /api/userManagement
    * 更新用户信息 API地址 /api/userUpdate
    * 删除用户(支持单个或多个删除) API地址 /api/userDelete
    * 所有用户和按条件查询合并 API地址 /api/userSearch
    * 单个用户 API地址 /api/findSingleUser
    * 所有用户 API地址 /api/findAllUser

`更多内容，敬请期待!`

<br />

### 3. 项目运行
  * yarn  (安装必需模块)
  * yarn inst (初始化项目及测试数据库等工具连接)
  * yarn start (启动项目)
