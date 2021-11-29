const { Sequelize, define } = require('sequelize')
const config = require('./config')
const { getMdFileList } = require('../static')

function initMySql() {
  return new Promise(async (resolve,reject) => {
    const sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 30000,
      },
    })
  
    try {
      await sequelize.authenticate()
      resolve(sequelize)
      console.log('Connection has been established successfully.')
    } catch (error) {
      reject(error)
      console.error('Unable to connect to the database:', error)
    }
  
    // define(modelName, attributes, [options]) -> Modal 定义表
    // 表中的字段通过第二个参数对象attributes来定义，对象中的一个属性相当于表中的一个字段。
    const mdListTable = sequelize.define(
      'md_lists',
      {
        id: {
          type: Sequelize.STRING(50),
          primaryKey: true,
        },
        mdId: Sequelize.STRING(10),
        createTime: Sequelize.BOOLEAN,
        fileName: Sequelize.STRING(10),
        type: Sequelize.BIGINT,
        content: Sequelize.BIGINT,
      },
      {
        timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
      }
    )
  
    // console.log('当前数据库中的表->', sequelize.models)
    // console.log('当前数据库可设置类型->', Sequelize.ARRAY)
    // console.log('获取对应表->', sequelize.model('md_list'))
    console.log('是否定义好->', sequelize.isDefined('md_lists'))
    console.log('获取对应表->', mdListTable)
    // mdListTable.save()
    // console.log(mdListTable)
  
    // filename: 'cdn描述',
    //   ext: 'md',
    //   text: '### cdn 称之为内容分发网络（Content Delivery Network 或 Content Distribution Network， 缩写：CDN）\r\n' +
    //     '\r\n' +
    //     '\r\n' +
    //     '> > 它是指通过相互链接的网络系统，利用最靠近每个用户的服务器；\r\n' +
    //     '> > 更快、更可靠的将图片、音乐、视频、应用程序及其它文件发送给用户；\r\n' +
    //     '> > 来提供高性能、可扩展性及低成本的网络内容传递给用户；\r\n' +
    //     '\r\n' +
    //     '### 在开发中，使用 cdn 的方式：\r\n' +
    //     '\r\n' +
    //     '> 打包的所有静态资源，放到 cdn 服务器，用户所有资源都是通过 cdn 服务器加载的；\r\n' +
    //     '> 一些第三方资源放到 cdn 服务器上；\r\n' +
    //     '    ',
    //   createTime: 2021-10-27T14:48:38.121Z,
    //   modifyTime: 2021-10-27T14:48:38.121Z,
    //   label: [ 'webpack学习' ]
    // const res = await getMdFileList('mdfile')
    // console.log(res)
    // for (let key in res) {
    //   res[key].dirContent.forEach(console.log)
    // }
    sequelize.sync()
    // const now = Date.now()
    // mdListTable
    //   .create({
    //     id: 123,
    //     mdId: 123,
    //     createTime: '123',
    //     fileName: '123',
    //     label: ['123'],
    //     content: '123',
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  })
  
}

module.exports = initMySql
