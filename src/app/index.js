/*
 * @Author: lwy
 * @Date: 2020-11-24 09:49:59
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-25 14:00:41
 * @FilePath: /coderhub/src/app/index.js
 */

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

// const userRouter = require('../router/user_router')
// const authRouter = require('../router/auth_router')

const errorHandle = require('./error-handle')

const useRoutes = require('../router')

const app = new Koa()

app.useRoutes = useRoutes

// 使用中间件
// 中间件是顺序执行的 所以bodyParser放在上面
app.use(bodyParser())


// 如果路由很多的情况下 下面这种方式也会比较冗余
// 可以动态绑定路由
app.useRoutes()

// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// app.use(authRouter.routes())
// app.use(authRouter.allowedMethods())

app.on('error', errorHandle)

module.exports = app