'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Items", [
      {
        name: "Flat Bill",
        tier: "common",
        type: "head",
        DEF: 1,
        description: "You look sick bro.",
        price: 2
      },
      {
        name: "DC Sweatshirt",
        tier: "common",
        type: "chest",
        DEF: 1,
        description: "Yeah, I know how to skateboard.",
        price: 2
      },
      {
        name: "Ripped Jeans",
        tier: "common",
        type: "legs",
        DEF: 1,
        description: "They're a statement, mom.",
        price: 2
      },
      {
        name: "Wooden Helmet",
        tier: "common",
        type: "head",
        DEF: 2,
        description: "You look ridiculous.",
        price: 4,
      },
      {
        name: "Wooden Chestplate",
        tier: "common",
        type: "chest",
        DEF: 2,
        description: "Don't stand near a fire.",
        price: 4
      },
      {
        name: "Wooden Pants",
        tier: "common",
        type: "legs",
        DEF: 2,
        description: "Good luck bending your knees.",
        price: 4
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    // Deletion handled in items seeder
  }
};