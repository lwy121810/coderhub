/*
 * @Author: lwy
 * @Date: 2020-12-11 14:11:56
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-11 14:26:18
 * @FilePath: /coderhub/src/middleware/label_middleware.js
 */
const labelService = require('../service/label_service')

// 检查标签是否存在/如果不存在 添加标签
const verifyExistLabels = async (ctx, next) => {
  // 1.获取标签数组
  const labels = ctx.request.body.labels
  // 2.判断标签是否存在
  const newLabels = []
  for (const name of labels) {
    const labelResult = await labelService.getLabelByName(name)
    const label = { name } 
    // 如果没有该标签 查询出来的就是空
    if (!labelResult) {
      // 没有该标签 添加该标签
      const result = await labelService.create(name)
      // 创建返回的insertId就是新标签的id
      label.id = result.insertId
    } else {
      // 查询出来的id的字段名就是id
      label.id = labelResult.id 
    }
    newLabels.push(label)
  }

  // 保存新标签
  ctx.labels = newLabels

  await next()
}

module.exports = {
  verifyExistLabels
}