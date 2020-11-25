/*
 * @Author: lwy
 * @Date: 2020-11-24 14:29:07
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-25 10:34:51
 * @FilePath: /coderhub/src/service/user_service.js
 */
const connection = require('../app/database')

 class UserService {
   async create(user) {
     // 将user存储到数据库
     const {name, password} = user
     const statement = `INSERT INTO users (name, password) VALUES (?, ?);`;
     const result = await connection.execute(statement,[name, password])
     console.log("将user存储到数据库: ", user);
     return result
   }

   async getUserByName(name) {
     const statement = `SELECT * FROM users WHERE name = ?;`
     const res = await connection.execute(statement, [name])
     return res[0]
   }

 }
 module.exports = new UserService()