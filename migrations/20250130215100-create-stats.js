'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      HP: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      MAX_HP: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ATT: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      DEF: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ATT_USED: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      LAST_ATT: {
        type: Sequelize.DATE,
      },
      CUR: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stats');
  }
};