const KoaRouter = require('koa-router')

const router = new KoaRouter()

// 获取md文章列表
const getmd = require('./md')
// 获取文章标签列表
const gettags = require('./tags')
// 上传md数据并生成新的md文件数据
const setMdFile = require('./setMdFile')
// 获取类型文件列表
const getFileList = require('./typeFileList')
// 获取md文件信息
const getFileInfo = require('./fileInfo')
// 获取时间线
const getTimeLine = require('./getTimeLine')


const routes = [
  {
    method: 'get',
    path: '/md',
    control: getmd,
  },
  {
    method: 'get',
    path: '/tags',
    control: gettags,
  },
  {
    method: 'post',
    path: '/setMdFile',
    control: setMdFile,
  },
  {
    method: 'post',
    path: '/getFileList',
    control: getFileList,
  },
  {
    method: 'post',
    path: '/getFileInfo',
    control: getFileInfo,
  },
  {
    method: 'get',
    path: '/getTimeLine',
    control: getTimeLine,
  },
]

for (let i = 0, l = routes.length; i < l; i += 1) {
  router[routes[i].method](routes[i].path,routes[i].control)
}

module.exports = router
