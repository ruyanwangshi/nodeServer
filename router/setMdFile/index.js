const writeFile = require('../../utils/write')
// const { initCatalogue } = require('../../shelljs/squelize')
const mdListModel = require('../../mysql/model/mdList')
const mdType = require('../../mysql/model/mdType')
const initResultMsg = require('../../utils/initResultMsg')

async function setMdFile(ctx, next) {
  try {
    const mdFileContent = ctx.request.body
    const { fileName, mdFile, typeName } = mdFileContent
    // 判断必传字段是否有
    if (!fileName || !mdFile || !typeName) {
      ctx.body = initResultMsg(false)
    } else {
      const isSave = await mdListModel.findAll({
        where: {
          fileName: fileName,
          type: typeName,
        },
      })
      if (isSave.length) {
        console.log('isSave=>', isSave)
        ctx.body = initResultMsg(false, null, '文章名,和类型已重复！')
      } else {
        const isTypeSave = await mdType.findAll({
          where: {
            type: typeName,
          },
        })
        if (!!isTypeSave.length) {
          await mdType.update(
            {
              mTime: new Date(),
              articles: isTypeSave[0].dataValues.articles + 1,
            },
            {
              where: {
                type: typeName,
              },
            }
          )
          await mdListModel.create({
            createTime: new Date(),
            fileName: fileName,
            modifyTime: new Date(),
            type: typeName,
            content: mdFile,
          })
          ctx.body = initResultMsg(true)
        } else {
          
          await Promise.all([mdType.create({
            type: typeName,
            cTime: new Date(),
            mTime: new Date(),
            articles: 1,
          }), mdListModel.create({
            createTime: new Date(),
            fileName: fileName,
            modifyTime: new Date(),
            type: typeName,
            content: mdFile,
          })])
          ctx.body = initResultMsg(true)
        }
      }

      // 写入文件做最后的备份
      writeFile(mdFileContent)
    }
  } catch (e) {
    ctx.body = initResultMsg(false)
  }
  next()
}

module.exports = setMdFile
