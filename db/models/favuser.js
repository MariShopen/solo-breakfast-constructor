'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'UserId' });
      this.belongsTo(models.Favorite, { foreignKey: 'FavoriteId' });
    }
  }
  FavUser.init({
    UserId: DataTypes.INTEGER,
    FavoriteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavUser',
  });
  return FavUser;
};