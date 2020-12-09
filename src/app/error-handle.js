/*
 * @Author: lwy
 * @Date: 2020-11-24 15:49:08
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-08 15:14:55
 * @FilePath: /coderhub/src/app/error-handle.js
 */
const errorTypes = require('../constants/error-types')
const errorHandle = function (error, ctx) {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_PASSWORD_IS_REQUIRED:
      status = 400,
        message = "用户名或者密码不能为空！"
      break;

    case errorTypes.USER_ALREADY_EXISTS:
      status = 409,
        message = "用户已存在！"
      break;

    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400,
        message = "该用户不存在！"
      break;

    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400,
        message = "密码不正确！"
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401,
        message = 'token无效'
      break;
      case errorTypes.UNPERMISSION:
        status = 401,
          message = '您不具备操作权限'
        break;
      
    default:
      status = 404,
        message = "Not Found"
      break;
  }
  ctx.status = status
  ctx.body = message
}
module.exports = errorHandle