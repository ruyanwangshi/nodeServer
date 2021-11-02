let shell = require('shelljs')
let name = process.argv[2] || 'Auto-commit';
let exec = shell.exec

console.log(name)