// const { getTags } = require('../../static')
const mdTypeModel = require('../../mysql/model/mdType')
const { sqInstance } = require('../../mysql/index')
// const shell = require('../../shelljs/squelize')
const initResultMsg = require('../../utils/initResultMsg')

async function Tags(ctx, next) {
  try {
    const { current, pageSize } = ctx.query
    console.log(current)
    console.log(pageSize)
    const res = await mdTypeModel.findAll({ 
      limit: +pageSize, //每页10条
      offset: (+current - 1) * +pageSize, //第x页*每页个数  
    })
    console.log('res=>', res)
    ctx.body = initResultMsg(true, res)
  } catch (e) {
    console.log(e)
    ctx.body = initResultMsg(false, null)
  }
  next()
}

module.exports = Tags
