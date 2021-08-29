const koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const cors = require('koa-cors')
const Router = require('./router')

const app = new koa()
app.use(koaStatic(`${__dirname}`, './public'))
app.use(cors())
app.use(koaBody())
app.use(Router.routes())

app.listen(3000, () => {
  console.log('192.168.31.12:3000')
})
