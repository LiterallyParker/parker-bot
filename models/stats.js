'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stats extends Model {

    static associate(models) {

    }
  }
  Stats.init({
    userId: DataTypes.INTEGER,
    HP: DataTypes.INTEGER,
    ATT: DataTypes.INTEGER,
    DEF: DataTypes.INTEGER,
    MAX_HP: DataTypes.INTEGER,
    ATT_USED: DataTypes.INTEGER,
    LAST_ATT: DataTypes.DATE,
    CUR: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stats',
    timestamps: false
  });
  return Stats;
};