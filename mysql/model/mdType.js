const { sqInstance, DataTypes } = require('../index')

const Md_type = sqInstance.define(
  'md_types',
  {
    typeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false, // 是否允许为NULL
      primaryKey: true, // 字段是主键
      autoIncrement: true, // 是否自增
    },
    // 类型外键
    type: {
      allowNull: false, // 是否允许为NULL
      unique: true,
      type: DataTypes.STRING,
    },
    // 创建时间
    cTime: {
      type: DataTypes.DATE,
    },
    // 修改时间
    mTime: {
      type: DataTypes.DATE,
    },
    // 当前类型有多少文章
    articles: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
  }
)

module.exports = Md_type