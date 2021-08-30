const path = require('path')
const koa = require('koa')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const server = require('koa-static')
const cors = require('koa-cors')
const Router = require('./router')

const app = new koa()
app.use(logger())
app.use(cors())
app.use(koaBody())
app.use(server(path.join(__dirname, '/public')))
app.use(Router.routes())
app.use(Router.allowedMethods())

app.listen(3000, () => {
  console.log('192.168.31.12:3000')
})
