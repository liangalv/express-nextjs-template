'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RefreshToken.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'User',
        onDelete: 'CASCADE'
      });
    }
  }
  RefreshToken.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.CHAR(60)
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });
  return RefreshToken;
};