// const { getMdFile } = require('../../static')
const mdListModel = require('../../mysql/model/mdList')
const initResultMsg = require('../../utils/initResultMsg')

async function md(ctx, next) {
  try {
    const { current, pageSize } = ctx.query
    const mdInfo = await Promise.all([mdListModel.count(),mdListModel.findAll({ 
      limit: +pageSize, //每页10条
      offset: (+current - 1) * +pageSize, //第x页*每页个数  
    })])
    const result = {
      data: mdInfo[1],
      pageSizeInfo: {
        current: current,
        pageSize: pageSize,
        total: mdInfo[0]
      }
    }
    ctx.body = initResultMsg(true, result)
  } catch (e) {
    console.log(e)
    ctx.body = initResultMsg(false, null)
  }
  next()
}

module.exports = md
