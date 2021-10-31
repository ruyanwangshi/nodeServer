const { Sequelize, define } = require('sequelize')
const config = require('./config')

initMySql()

async function initMySql() {
  var sequelize = new Sequelize(config.database, config.username, config.password, {
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
    console.log('Connection has been established successfully.')
  } catch (error) {
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
  sequelize.sync()
  // const now = Date.now()
  mdListTable
    .create({
      id: 123,
      mdId: 123,
      createTime: '123',
      fileName: '123',
      label: ['123'],
      content: '123',
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
