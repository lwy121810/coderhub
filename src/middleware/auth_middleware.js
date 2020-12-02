/*
 * @Author: lwy
 * @Date: 2020-11-25 11:22:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-02 17:53:49
 * @FilePath: /coderhub/src/middleware/auth_middleware.js
 */
const jwt = require('jsonwebtoken')

const { PUBLIC_KEY } = require('../app/config')
const errorTypes = require('../constants/error-types')
const service = require('../service/user_service')
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
    await next()
  } catch (err) {
    emitError(ctx, errorTypes.UNAUTHORIZATION)
  }
}

module.exports = {
  verifyLogin,
  verfiyAuth
}