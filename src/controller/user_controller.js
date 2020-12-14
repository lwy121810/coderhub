/*
 * @Author: lwy
 * @Date: 2020-11-24 14:27:06
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-14 18:48:13
 * @FilePath: /coderhub/src/controller/user_controller.js
 */
const userService = require('../service/user_service')
const fileService = require('../service/file_service')

class UserController {
  async create(ctx, next) {
    // 获取用户请求参数
    const user = ctx.request.body
    // 查询数据
    const result = await userService.create(user)
    // 返回数据
    ctx.body = result
  }
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params 
    const result = await fileService.getAvatarByUserId(userId)
    ctx.body = result
  }

}

module.exports = new UserController()