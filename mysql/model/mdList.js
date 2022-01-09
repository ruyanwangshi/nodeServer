const { sqInstance, DataTypes } = require('../index')
const mdType = require('./mdType.js')
// const { getMdFileList } = require('../../static/index')

const Md_list = sqInstance.define(
  'md_lists',
  {
    // 主键id
    id: {
      type: DataTypes.INTEGER(200),
      allowNull: false, // 是否允许为NULL
      primaryKey: true, // 字段是主键
      autoIncrement: true, // 是否自增
    },
    // 创建时间
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // 文件名称
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    // 修改时间
    modifyTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // 文章类型
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    // 文件类型
    ext: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    // 文件字符串内容
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
  }
)

// 一对多，mdType可以有很多的md_list
mdType.hasMany(Md_list, {
  foreignKey: 'type',
  sourceKey: 'type',
})
// 但是md_list只能有一个mdType
Md_list.belongsTo(mdType, {
  foreignKey: 'type',
  sourceKey: 'type',
})

// Md_list.sync().catch((err) => {
//   console.log(err)
// })
// mdType.sync().catch((err) => {
//   console.log(err)
// })

// 测试代码，查找md_lists包含在mdType所有文章
// mdType
//   .findAll({
//     // 联合查询
//     attributes: ['type'],
//     include: [
//       {
//         model: Md_list,
//         attributes: ['id', 'fileName', 'type'],
//       },
//     ],
//     raw: false,
//   })
//   .then((res) => {
//     res.forEach(item => {
//       console.log(item.type)
//       console.log(item.md_lists)
//     })
//   })

// Md_list.findAll().then(res => {
//   console.log(res.type)
// })

// async function sync() {
//   const res = await Md_list.findAll({
//     group: 'type',
//     attributes: ['type', [sqInstance.fn('COUNT', sqInstance.col('*')), 'newType']],
//   })
//   res.forEach((item) => {
//     console.log({
//       type: item.dataValues.type,
//       createTime: new Date(),
//       modifyTime: new Date(),
//       articles: item.dataValues.newType,
//     })
//     mdType
//       .sync({ alter: true })
//       .then((res) => {
//         mdType
//           .create({
//             type: item.dataValues.type || '',
//             cTime: new Date() || '',
//             mTime: new Date() || '',
//             articles: item.dataValues.newType || 0,
//           })
//           .catch((err) => {
//             console.log(err)
//           })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   })
// }

// sync().catch((err) => {
//   console.log(err)
// })

// 同步本地数据上传到数据库
// Md_list.sync({ alter: true })
//   .then((res) => {
//     getMdFileList('mdfile').then((res) => {
//       console.log(res)
//       for (let key in res) {
//         if(res[key]) {
//           res[key].dirContent.forEach((item) => {
//             console.log(item.filename)
//             Md_list.create({
//               fileName: item.filename,
//               type: key || '',
//               content: item.text || '',
//               ext: item.ext || '',
//               modifyTime: item.modifyTime || '',
//               createTime: item.createTime || '',
//             }).catch((err) => {
//               console.log(err)
//             })
//           })
//         }
//       }
//     })
//   })
//   .catch((err) => {
//     console.log(err)
//   })

module.exports = Md_list
