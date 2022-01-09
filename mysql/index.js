const { Sequelize, DataTypes } = require('sequelize')
const config = require('./config')
const sqInstance = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000,
  },
})

sqInstance
  .authenticate()
  .then((res) => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

module.exports = {
  sqInstance,
  DataTypes
}
