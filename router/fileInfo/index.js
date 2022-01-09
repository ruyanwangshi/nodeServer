// const { getFileInfo } = require('../../static')
const mdListModel = require('../../mysql/model/mdList')


async function GetFileInfo(ctx, next) {
    
  try {
    const file = ctx.request.body
    const res = await getFileInfo('mdfile', file);
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

module.exports = GetFileInfo
