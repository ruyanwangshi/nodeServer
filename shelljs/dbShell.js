module.exports = {
    create:{
        commandMap: 'npx sequelize-cli db:create',
        sucessMsg: `创建数据库成功！`,
        commandHelp: '创建数据库'
    },
    model: {
        commandMap: 'npx sequelize-cli model:generate',
        sucessMsg: `创建模型成功！`,
        commandHelp: '创建模型'
    }
}