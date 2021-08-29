const path = require('path')
const fs = require('fs')

function resolvePath(resolve) {
  return path.resolve(__dirname, resolve)
}

const readFilePath = resolvePath('./mdfile')

function ReadMdFile() {
  return new Promise((resolve, reject) => {
    const mdData = []
    fs.readdir(readFilePath, (err, file) => {
      if (err) {
        reject(err)
      } else {
        for (let i = 0, l = file.length; i < l; i += 1) {
          fs.readFile(resolvePath(`${readFilePath}/${file[i]}`), 'utf-8', (err, data) => {
            if (err) {
              reject(err)
            } else {
              mdData.push({
                filename: path.basename(file[i], '.md'),
                text: data
              })
              if (mdData.length === file.length) {
                resolve(mdData)
              }
            }
          })
        }
      }
    })
  })
}

module.exports = { ReadMdFile }
