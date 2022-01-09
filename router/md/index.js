// const { getMdFile } = require('../../static')
const mdListModel = require('../../mysql/model/mdList')

async function md(ctx, next) {
  try {
    const { current, pageSize } = ctx.query
    const mdInfo = await Promise.all([mdListModel.count(),mdListModel.findAll({ 
      limit: +pageSize, //每页10条
      offset: (+current - 1) * +pageSize, //第x页*每页个数  
    })])
    ctx.body = {
      httpCode: 200,
      result: {
        data: mdInfo[1],
        pageSizeInfo: {
          current: current,
          pageSize: pageSize,
          total: mdInfo[0]
        }
      },
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
