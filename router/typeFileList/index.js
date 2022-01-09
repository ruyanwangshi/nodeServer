// const { getTypeFileList } = require('../../static')
const mdListModel  = require('../../mysql/model/mdList')

async function GetTypeFileList(ctx, next) {
  const { type } = ctx.request.body
  try {
    // const res = await getTypeFileList(`mdfile/${type}`)
    const result = await mdListModel.findAll({
      where: {
        type: type
      }
    })
    if (type) {
      ctx.body = {
        httpCode: 200,
        result: result,
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
