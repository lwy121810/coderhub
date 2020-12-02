/*
 * @Author: lwy
 * @Date: 2020-11-25 13:54:57
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-25 15:19:07
 * @FilePath: /coderhub/src/router/index.js
 */
const fs = require('fs')

// 动态加载路由
const useRoutes = function() {
  fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js') return
    const router = require(`./${file}`)
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}

module.exports = useRoutes