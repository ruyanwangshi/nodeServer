const { sqInstance } = require('../../mysql')
const mdListModel = require('../../mysql/model/mdList')
const initResultMsg = require('../../utils/initResultMsg')

async function getTimeLine(ctx, next) {
  try {
    const { current, pageSize } = ctx.query
    const timerlineRes = await Promise.all([
      mdListModel.count(),
      mdListModel.findAll({
        order: ['createTime'],
        limit: +pageSize, //每页10条
        offset: (+current - 1) * +pageSize, //第x页*每页个数
      }),
    ])
    // const sqlPage = `SELECT * FROM \`md_lists\` ORDER BY COALESCE(createTime) LIMIT ${pageSize} OFFSET ${pageSize * (current - 1)}`
    // const sqkCount = 'SELECT COUNT(*) FROM `md_lists`'
    // const timerlineRes = await Promise.all([
    //   sqInstance.query(sqkCount),
    //   sqInstance.query(sqlPage)
    // ])
    const result = {
      data: timerlineRes[1],
      pageSizeInfo: {
        current: current,
        pageSize: pageSize,
        total: timerlineRes[0]
      },
    }
    ctx.body = initResultMsg(true, result)
  } catch (e) {
    console.log(e)
    ctx.body = initResultMsg(false, null)
  }
  next()
}

module.exports = getTimeLine
