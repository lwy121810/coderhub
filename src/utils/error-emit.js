/*
 * @Author: lwy
 * @Date: 2020-12-02 17:12:37
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-02 17:14:01
 * @FilePath: /coderhub/src/utils/error-emit.js
 */

 const emitError = (ctx, errorType) => {
  const error = new Error(errorType)
  return ctx.app.emit('error', error, ctx)
 }
 module.exports = emitError