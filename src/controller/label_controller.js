/*
 * @Author: lwy
 * @Date: 2020-12-11 10:41:23
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-11 16:27:51
 * @FilePath: /coderhub/src/controller/label_controller.js
 */
const service = require('../service/label_service')

class LabelController {
  async create(ctx, next) {
    const name = ctx.request.body.name 
    if (!name) {
      ctx.body = 'name不能为空！'
      return
    }
    const res = await service.create(name)
    ctx.body = res 
  }


  // 获取标签
  async list(ctx, next) {
    const {size, offset} = ctx.query
    const res = await service.getLabels(size, offset)
    ctx.body = res
  }

}

module.exports = new LabelController