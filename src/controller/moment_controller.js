/*
 * @Author: lwy
 * @Date: 2020-12-02 17:44:59
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-02 17:45:48
 * @FilePath: /coderhub/src/controller/moment_controller.js
 */
class MomentController {
  async create(ctx, next) {
    ctx.body = '发表动态成功！'
  }
}
module.exports = new MomentController()