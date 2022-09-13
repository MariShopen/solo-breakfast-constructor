'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, { through: models.FavUser });
      this.hasMany(models.FavUser, { foreignKey: 'FavoriteId' });
    }
  }
  Favorite.init({
    recipeId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    servings: DataTypes.INTEGER,
    timeOfCook: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    fav: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};