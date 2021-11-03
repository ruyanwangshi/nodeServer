const { getTags } = require('../../static')

async function Tags(ctx, next) {
  try {
    const res = await getTags('mdfile')
    console.log(res)
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
}

module.exports = Tags
