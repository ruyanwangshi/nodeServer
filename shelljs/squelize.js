const shell = require('shelljs')
const resolvePath = require('../utils/resolvePath')
let name = process.argv[2] || 'Auto-commit'
let exec = shell.exec

const filePath = 'static/mdfile'

// 初始化目录结构
exports.initCatalogue = function initCatalogue(path, fileName = '', type) {
  try {
    shell.cd(path)

    if (fileName) {
      console.log(shell.ls())
      // --title 目录名称 '**${fileName}**'
      // --maxlevel 3 . 最大生成目录层级为3级
      // --nodejs生成对应目录主题
      exec(`npx doctoc ${fileName}.${type} --title '**${fileName}**' --maxlevel 3 .`, { async: true })
    } else {
      shell.ls().forEach(function (file) {
        exec(`npx doctoc ${file} --title '**${file.split('.')[0]}**'`, { async: true })
        const itemObj = shell.cat(file)
      })
    }

    console.log(shell.pwd().stdout)

    shell.cd('../../')
  } catch (e) {
    throw new Error(`initCatalogue 函数异常; ${e}`)
  }
}
