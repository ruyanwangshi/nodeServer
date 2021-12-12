async function setMdFile(ctx, next) {
    console.log(222)
  try {
    // console.log(ctx)
    ctx.body = {
      httpCode: 200,
      result: '测试',
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

module.exports = setMdFile
