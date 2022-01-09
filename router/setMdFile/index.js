const writeFile = require('../../utils/write')
const { initCatalogue } = require('../../shelljs/squelize')
async function setMdFile(ctx, next) {
  try {
    const mdFileContent = ctx.request.body;
    const { fileName, mdFile, typeName } = mdFileContent;
    // 判断必传字段是否有
    if(!fileName || !mdFile || !typeName) {
      ctx.body = {
        httpCode: 400,
        result: '请输入必填项',
        Message: '请求成功',
        success: true,
      }
      return
    }
    await writeFile(mdFileContent, initCatalogue)
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
