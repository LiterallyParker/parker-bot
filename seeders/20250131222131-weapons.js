'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Items", [
      {
        name: "Wooden Stick",
        tier: "common",
        type: "weapon",
        ATT: 12,
        description: "A wooden stick. It's very \"sticky\".",
        price: 2
      },
      {
        name: "Metal Rod",
        tier: "common",
        type: "weapon",
        ATT: 15,
        description: "It's an (*insert dropped metal rod noise*).",
        price: 7
      },
      {
        name: "Wooden Club",
        tier: "common",
        type: "weapon",
        ATT: 16,
        description: "Bonk 'em on the head.",
        price: 10
      },
      {
        name: "Rusty sword",
        tier: "common",
        type: "weapon",
        ATT: 18,
        description: "I'd be more worried about the tetnis.",
        price: 15
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    // Deletion handled in items seeder
  }
};