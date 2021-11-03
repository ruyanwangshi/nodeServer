const { getMdFile } = require('../../static')


async function md(ctx, next) {
    
  try {
    const { current } = ctx.query
    const res = await getMdFile('mdfile', +current)
    ctx.body = {
      httpCode: 200,
      result: res,
      Message: '请求成功',
      success: true,
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      httpCode: 400,
      Message: '请求失败',
      success: false,
    }
  }
  next()
}

module.exports = md
