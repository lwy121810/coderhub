/*
 * @Author: lwy
 * @Date: 2020-11-24 15:22:45
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-25 10:40:16
 * @FilePath: /coderhub/src/middleware/user_middleware.js
 */
const errorTypes = require('../constants/error-types')
const md5Password = require('../utils/password-handle')
const service = require('../service/user_service')

const verifyUser = async (ctx, next) => {
  // 1.获取用户姓名和密码
  const {name, password} = ctx.request.body 
  // 2.判断名称和密码是否为空
  if (!name || !password || name === '' || password ==='') {
    const error = new Error(errorTypes.NAME_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 3.判断用户是否存在
  const res = await service.getUserByName(name)
  if (res.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  
  await next();
}
// 对密码进行加密处理
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  console.log('对密码进行加密处理', password);
  ctx.request.body.password = md5Password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}