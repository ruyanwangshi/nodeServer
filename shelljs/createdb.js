const shell = require('shelljs')
const command = require('./dbShell')
const resolvePath = require('../utils/resolvePath')
let dbName = process.argv[2]
const CMD = process.argv.slice(3, process.argv.length)
let exec = (...arg) => {
  log(arg[1])
  if (arg[0]) return shell.exec(`${arg[0]} ${CMD.join(' ')}`,)
}


exec(command[dbName]?.commandMap, dbName, ...CMD)

function log(type) {
  if(command[type]) {
    console.log(command[type].sucessMsg)
  } else {
      console.log('请输入对应命令：')
      console.log()
      for(item in command) {
          console.log(`${item}: ${command[item].commandHelp}`)
      }
  }
}
