const path = require('path')
const koa = require('koa')
require('./mysql')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const server = require('koa-static')
const cors = require('koa-cors')
const Router = require('./router')
const bodyparser = require('koa-bodyparser')
const os = require('os') // 操作系统模块
// const initMySql = require('./mysql')
const app = new koa()
app.use(logger())

app.use(cors())
app.use(koaBody()) // 这个必须是在bodyparser中间件之前使用
// app.use(bodyparser())
app.use(server(path.join(__dirname, '/public')))

// initMySql()
//   .then((sequelize) => {
//     app.use(async (ctx, next) => {
//       ctx.state.sequelize = sequelize
//       await next()
//     })
//     app.use(Router.routes())
//     app.use(Router.allowedMethods())
//   })
//   .catch((err) => {
//     console.log(err)
//   })

app.use(Router.routes())
app.use(Router.allowedMethods())

const httpInfo = os.networkInterfaces()
let ip = '0.0.0.0'
let post = '3001'
if(httpInfo.WLAN) {
  httpInfo.WLAN.forEach(item => {
    if(item.family === 'IPv4') {
      ip = item.address
    }
  })
}

app.listen(post, () => {
  console.log(`${ip}:${post}`)
})
