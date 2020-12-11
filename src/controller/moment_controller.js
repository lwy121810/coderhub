/*
 * @Author: lwy
 * @Date: 2020-12-02 17:44:59
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-11 15:02:57
 * @FilePath: /coderhub/src/controller/moment_controller.js
 */
const service = require('../service/moment_service')
const labelService = require('../service/label_service')

class MomentController {
  // 添加评论
  async create(ctx, next) {
    // 1.获取userid content
    const userId = ctx.user.id 
    const content = ctx.request.body.content 
    console.log('获取userId和内容：',userId, content);
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
  async update(ctx, next) {
    const momentId = ctx.params.momentId
    const content = ctx.request.body.content 
    const res = await service.update(content,momentId)
    ctx.body = res
  }
  async remove(ctx, next) {
    const momentId = ctx.params.momentId
    const res = await service.remove(momentId)
    ctx.body = res
  }
  // 添加标签
  async addLabels(ctx, next) {
    const labels = ctx.labels 
    const { momentId } = ctx.params
    for (const label of labels) {
      const labelId = label.id 
      const isExist = await service.hasLabel(momentId, labelId)
      // 不存在该标签
      if (!isExist) {
        // 添加标签
        await service.addLabel(momentId, labelId)
      }
    }
    ctx.body = '给动态添加标签'
  }
}
module.exports = new MomentController()

