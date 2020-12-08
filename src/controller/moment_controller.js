/*
 * @Author: lwy
 * @Date: 2020-12-02 17:44:59
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-08 14:07:45
 * @FilePath: /coderhub/src/controller/moment_controller.js
 */
const service = require('../service/moment_service')

class MomentController {
  // 添加评论
  async create(ctx, next) {
    // 1.获取userid content
    const userId = ctx.user.id 
    const content = ctx.request.body.content 
    console.log(userId, content);
    // 插入数据
    const result = await service.create(userId, content)
    ctx.body = result
  }
  // 获取评论
  async detail(ctx, next) {
    const id = ctx.params.momentId
    const result = await service.getMomentById(id)
    ctx.body = result
  }
  async list(ctx, next) {
    const {offset, size} = ctx.query
    console.log(offset, size);
    const result = await service.getMomentList(offset, size)
    ctx.body = result
  }
}
module.exports = new MomentController()