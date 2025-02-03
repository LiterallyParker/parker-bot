'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Items", [
      {
        name: "Seal of Defense",
        tier: "common",
        type: "accessory",
        DEF: 5,
        description: "Adds 5 to the user's DEF when equiped.",
        price: 10
      },
      {
        name: "Seal of Attack",
        tier: "common",
        type: "accessory",
        ATT: 5,
        description: "Adds 5 to the user's ATT when equiped.",
        price: 10
      },
      {
        name: "Seal of Health",
        tier: "common",
        type: "accessory",
        HP: 5,
        description: "Adds 5 to the user's HP when equiped.",
        price: 10
      },
      {
        name: "Seal of Life",
        tier: "common",
        type: "accessory",
        MAX_HP: 5,
        description: "Adds 5 to the user's MAX HP when equiped.",
        price: 10
      },
    ])
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Items', null, {});

  }
};