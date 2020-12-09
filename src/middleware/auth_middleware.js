/*
 * @Author: lwy
 * @Date: 2020-11-25 11:22:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-09 17:47:23
 * @FilePath: /coderhub/src/middleware/auth_middleware.js
 */
const jwt = require('jsonwebtoken')

const { PUBLIC_KEY } = require('../app/config')
const errorTypes = require('../constants/error-types')
const userService = require('../service/user_service')
const authService = require('../service/auth_service')

const md5Password = require('../utils/password-handle')
const emitError = require('../utils/error-emit')

const verifyLogin = async (ctx, next) => {
  // 1.获取用户名/密码
  const { name, password } = ctx.request.body
  // 2.判断名称和密码是否为空
  if (!name || !password || name === '' || password === '') {
    const error = new Error(errorTypes.NAME_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 3.用户是否存在
  const result = await userService.getUserByName(name)
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
  console.log('设置user', user);
  ctx.user = user

  await next()
}

const verfiyAuth = async (ctx, next) => {
  console.log('验证授权的middleware')
  // 1.获取token
  const auth = ctx.headers.authorization
  if (!auth) {
    return emitError(ctx, errorTypes.UNAUTHORIZATION)
  }
  const token = auth.replace('Bearer ', '')

  // 2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    console.log('验证token的结果：', result);
    // 保存result（id/name/iat/exp）
    ctx.user = result
    console.log('验证结果：', result);
    await next()
  } catch (err) {
    emitError(ctx, errorTypes.UNAUTHORIZATION)
  }
}
// 设置通用的检查权限方法（二）
const verfiyPermission = async (ctx, next) => {
  // 按照RESTful风格 第一个参数传入的是对应数据表的id 
  // 参数名是 表名+Id 的形式 momentId/commentId
  const [resourceKey] = Object.keys(ctx.params)
  // 获取对应的数据表
  const tableName = resourceKey.replace('Id', '')
  // 获取资源id
  const resourceId = ctx.params[resourceKey]

  const { id } = ctx.user 
  try {
    const isPermission = await authService.checkResource(tableName, resourceId,id)
    if (!isPermission) throw new Error()
    await next()
  } catch (error) {
    console.log(error);
    return emitError(ctx, errorTypes.UNPERMISSION)
  }
}

// 设置通用的检查权限方法（一）
// 这里将verfiyPermission设置成一个函数 返回的是一个中间件 外界传入对应的表名
// const verfiyPermission = (tableName) => {
//   return async (ctx, next) => {
//     const resourceKey = tableName + 'Id'
//     const resourceId = ctx.params[resourceKey];
//     const { id } = ctx.user 
//     try {
//       const isPermission = await authService.checkResource(tableName,resourceId, id)
//       if (!isPermission) throw new Error()
//       await next()
//     } catch (error) {
//       console.log(error);
//       return emitError(ctx, errorTypes.UNPERMISSION)
//     }
//   }
// }

// 这里只能检查动态的权限 
// const verfiyPermission = async (ctx, next) => {
//   const { momentId } = ctx.params;
//   const { id } = ctx.user 
//   try {
//     const isPermission = await authService.checkMoment(momentId, id)
//     if (!isPermission) throw new Error()
//     await next()
//   } catch (error) {
//     console.log(error);
//     return emitError(ctx, errorTypes.UNPERMISSION)
//   }
// }




module.exports = {
  verifyLogin,
  verfiyAuth,
  verfiyPermission
}