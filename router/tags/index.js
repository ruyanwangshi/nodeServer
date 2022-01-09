// const { getTags } = require('../../static')
const mdTypeModel = require('../../mysql/model/mdType')
const { sqInstance } = require('../../mysql/index')
// const shell = require('../../shelljs/squelize')

async function Tags(ctx, next) {
  try {
    const res = await mdTypeModel.findAll({
      attributes:['typeId', 'type', 'cTime', 'mTime', 'articles']
    })
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

module.exports = Tags
