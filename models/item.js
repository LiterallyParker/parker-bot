'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init({
    name: DataTypes.STRING,
    tier: DataTypes.STRING,
    type: DataTypes.STRING,
    HP: DataTypes.INTEGER,
    MAX_HP: DataTypes.INTEGER,
    ATT: DataTypes.INTEGER,
    DEF: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
    timestamps: false,
  });
  return Item;
};