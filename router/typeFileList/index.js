const { getTypeFileList } = require('../../static')

async function GetTypeFileList(ctx, next) {
  const { name } = ctx.request.body
  try {
    const res = await getTypeFileList(`mdfile/${name}`)
    if (name) {
      ctx.body = {
        httpCode: 200,
        result: res,
        Message: '请求成功',
        success: true,
      }
    } else {
      ctx.body = {
        httpCode: 200,
        result: 'name是必传字段',
        Message: '请求成功',
        success: false,
      }
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

module.exports = GetTypeFileList
