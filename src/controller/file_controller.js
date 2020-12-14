/*
 * @Author: lwy
 * @Date: 2020-12-14 17:35:43
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-14 17:41:34
 * @FilePath: /coderhub/src/controller/file_controller.js
 */
const service = require('../service/file_service')

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 获取图像相关信息
    const { filename, mimetype, size} = ctx.req.file 
    const { id } = ctx.user 
    console.log(ctx.req.file);
    const result = await service.createAvatar(filename, mimetype,size, id)
    ctx.body = result
  }
}

module.exports = new FileController()