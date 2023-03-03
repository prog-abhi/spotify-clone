"use strict";

const artistsArray = [
  {
    first_name: "Zaphod",
    last_name: "Beeb",
  },
  {
    first_name: "Lionell",
    last_name: "Helmgart",
  },
  {
    first_name: "Satish",
    last_name: "MD",
  },
  {
    first_name: "Md.",
    last_name: "Ismail",
  },
  {
    first_name: "Lily",
    last_name: "Koretkevich",
  },
  {
    first_name: "Karen",
    last_name: "Gun",
  },
  {
    first_name: "Dong",
    last_name: "Lee",
  },
  {
    first_name: "Gun",
    last_name: "Park",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("artists", artistsArray);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let idx = 0; idx < artistsArray.length; idx++) {
      let { first_name, last_name } = artistsArray[idx];
      await queryInterface.bulkDelete("artists", null, {
        where: { first_name, last_name },
      });
    }
  },
};
