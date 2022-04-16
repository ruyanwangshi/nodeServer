// const { getTypeFileList } = require('../../static')
const mdListModel  = require('../../mysql/model/mdList')
const initResultMsg = require('../../utils/initResultMsg')

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
      ctx.body = initResultMsg(true, result)
    } else {
      ctx.body = initResultMsg(false, null, 'name是必传字段')
    }
  } catch (e) {
    ctx.body = initResultMsg(false, null)
  }
  next()
}

module.exports = GetTypeFileList
