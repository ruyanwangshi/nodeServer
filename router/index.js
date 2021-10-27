const KoaRouter = require('koa-router')

const router = new KoaRouter()

const { getMdFile } = require('../static')

router.get('/md', async (ctx, next) => {
  try {
    const { current } = ctx.query
    const res = await getMdFile('mdfile', +current)
    // console.log(res)
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

router.get('/info', async (ctx, next) => {
  try {
    const { current } = ctx.query
    const res = await getMdFile('mdfile', +current)
    // console.log(res)
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

// router.post('/md', async (ctx, next) => {
//   try {
//     const res = await getMdFile('mdfile')
//     // console.log(res)
//     ctx.body = {
//       httpCode: 200,
//       result: res,
//       Message: '请求成功',
//       success: true,
//     }
//   } catch (e) {
//     ctx.body = {
//       httpCode: 400,
//       Message: '请求失败',
//       success: false,
//     }
//   }
//   next()
// })

module.exports = router
