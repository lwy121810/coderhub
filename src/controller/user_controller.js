/*
 * @Author: lwy
 * @Date: 2020-11-24 14:27:06
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-24 15:05:04
 * @FilePath: /coderhub/src/controller/user_controller.js
 */
const service = require('../service/user_service')

class UserController {
  async create(ctx, next) {
    // 获取用户请求参数
    const user = ctx.request.body
    // 查询数据
    const result = await service.create(user)
    console.log("result: ", result);
    // 返回数据
    ctx.body = result
  }
}

module.exports = new UserController()