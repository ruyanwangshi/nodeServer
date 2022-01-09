'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  student.init({
    student_name: DataTypes.STRING,
    student_age: DataTypes.INTEGER,
    student_sex: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'student',
  });
  return student;
};