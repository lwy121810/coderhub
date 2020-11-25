/*
 * @Author: lwy
 * @Date: 2020-11-25 10:55:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-25 11:00:30
 * @FilePath: /coderhub/src/controller/auth_controller.js
 */
class AuthController {
  async login(ctx, next) {
    const {name} = ctx.request.body
    ctx.body = `登录成功！欢迎${name}回来`
  }
}

module.exports = new AuthController()