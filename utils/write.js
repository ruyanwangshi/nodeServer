const { writeFile, promises } = require('fs')
const resolvePath = require('./resolvePath')

const mdfilePath = 'static/mdfile'

// 写入文件工具函数
module.exports = function write(fileContent = {}) {
  const { fileName, mdFile, typeName } = fileContent
  if (!fileName) {
    fileName = 'ceshi'
  }

  function setMdFile(resolve, reject) {
    const filePath = `${mdfilePath}/${typeName}`
    writeFile(`${resolvePath(filePath, fileName)}.md`, mdFile, 'utf8', (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  }

  return new Promise((resolve, reject) => {
    promises
      .readdir(mdfilePath)
      .then((data) => {
        // 如果当前分类文件夹是有文件的，那么只需要写入md文件即可
        if (data.includes(typeName)) {
          setMdFile(resolve, reject)
        } else {
          // 如果没有文件需要进行创建文件夹然后再写入文件
          const filePath = `${mdfilePath}/${typeName}`
          promises.mkdir(resolvePath(filePath), { recursive: true }).then(() => {
            setMdFile(resolve, reject)
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })
}