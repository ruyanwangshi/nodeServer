const path = require('path')

const root = process.cwd()

function resolvePath(fileName = '', pathUrl = '') {
    return path.resolve(root, fileName, pathUrl)
}

module.exports = resolvePath