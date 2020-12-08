/*
 * @Author: lwy
 * @Date: 2020-11-25 10:55:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-08 10:28:43
 * @FilePath: /coderhub/src/controller/auth_controller.js
 */
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  // 登录
  async login(ctx, next) {
    const {id, name} = ctx.user
    // 生成签名
    const token = jwt.sign({id, name}, PRIVATE_KEY,{
      expiresIn:24 * 60 * 60 ,
      algorithm:'RS256'   
    })
    console.log('生成token');
    // 返回id name token
    ctx.body = {id, name, token}
  }

  async success(ctx, next) {
    ctx.body = '授权成功'
  }


}

module.exports = new AuthController()