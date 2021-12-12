const KoaRouter = require('koa-router')

const router = new KoaRouter()

const getmd = require('./md')
const gettags = require('./tags')
const setMdFile = require('./setMdFile')


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
]

for (let i = 0, l = routes.length; i < l; i += 1) {
  router[routes[i].method](routes[i].path,routes[i].control)
}

module.exports = router
