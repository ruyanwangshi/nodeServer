// const { getFileInfo } = require('../../static')
const mdListModel = require('../../mysql/model/mdList')
const initResultMsg = require('../../utils/initResultMsg')

async function GetFileInfo(ctx, next) {
    
  try {
    const file = ctx.request.body
    const res = await getFileInfo('mdfile', file);
    ctx.body = initResultMsg(true, res)
    
  } catch (e) {
    console.log(e)
    ctx.body = initResultMsg(false, null)
  }
  next()
}

module.exports = GetFileInfo
