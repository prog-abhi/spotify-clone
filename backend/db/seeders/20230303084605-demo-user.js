"use strict";

const { Op } = require("sequelize");
const { user } = require("../models");

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
    await queryInterface.bulkInsert("users", [
      {
        username: "demo-user",
        first_name: "John",
        last_name: "Doe",
        email: "johnDoe@demo.io",
        hashed_password: user.generateHashpassword("password"),
      },
      {
        username: "demo-user-2",
        first_name: "Jane",
        last_name: "Swan",
        email: "janeSwam@demo.io",
        hashed_password: user.generateHashpassword("password2"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {
      where: { username: { [Op.in]: ["demo-user", "demo-user-2"] } },
    });
  },
};
