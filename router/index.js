const KoaRouter = require('koa-router')

const router = new KoaRouter()

const { ReadMdFile } = require('../static/md')
console.log()

router.get('/md', async (ctx, next) => {
  try {
    const res = await ReadMdFile()
    ctx.body = {
      httpCode: 200,
      result: res,
      Message: '请求成功',
      success: true,
    }
  } catch (e) {
    ctx.body = {
      httpCode: 400,
      Message: '请求失败',
      success: false,
    }
  }
  next()
})

module.exports = router
