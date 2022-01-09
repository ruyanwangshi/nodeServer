const path = require('path')

const root = process.cwd()

function resolvePath(fileName = '', pathUrl = '', ...argPath) {
    return path.resolve(root, fileName, pathUrl, ...argPath)
}

module.exports = resolvePath