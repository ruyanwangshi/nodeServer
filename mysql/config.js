const { pwd } = require('../pwd/contant')
module.exports = {
  database: 'blog', // 使用哪个数据库
  username: 'root', // 用户名
  password: pwd, // 口令
  host: '127.0.0.1', // 主机名
  port: 3306, // 端口号，MySQL默认3306
}
