/*
 * @Author: lwy
 * @Date: 2020-11-25 11:22:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-25 11:31:56
 * @FilePath: /coderhub/src/middleware/auth_middleware.js
 */
const errorTypes = require('../constants/error-types')
const service = require('../service/user_service')
const md5Password = require('../utils/password-handle')

 const verifyLogin = async (ctx, next) => {
   // 1.获取用户名/密码
   const {name, password} = ctx.request.body 
   // 2.判断名称和密码是否为空
   if (!name || !password || name === '' || password ==='') {
     const error = new Error(errorTypes.NAME_PASSWORD_IS_REQUIRED)
     return ctx.app.emit('error', error, ctx)
   }
   // 3.用户是否存在
   const result = await service.getUserByName(name)
   const user = result[0]
   if (!user) {
     const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
     return ctx.app.emit('error', error, ctx)
   }
   // 4.密码是否和数据库中存储的一样（加密）
   if (md5Password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error', error, ctx)
   }
   await next()
 }

module.exports = {
  verifyLogin
}