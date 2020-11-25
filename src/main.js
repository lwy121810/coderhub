/*
 * @Author: lwy
 * @Date: 2020-11-24 09:44:27
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-24 13:53:39
 * @FilePath: /coderhub/src/main.js
 */

const app = require('./app')
const config = require('./app/config')

app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功！`);
})