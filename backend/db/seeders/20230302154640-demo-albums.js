"use strict";

const { Op } = require("sequelize");

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
    await queryInterface.bulkInsert("albums", [
      {
        title: "Dark",
        image_path: "images/camera-g95da31dea_640.jpg",
      },
      {
        title: "StarStuck",
        image_path: "images/cat-ge22ab5290_640.jpg",
      },
      {
        title: "Power",
        image_path: "images/mountains-gf4f05b159_640.jpg",
      },
      {
        title: "Pink",
        image_path: "images/paintbrush-gef6964d89_640.jpg",
      },
      {
        title: "Melody",
        image_path: "images/sea-g841682d20_640.jpg",
      },
      {
        title: "Just do it",
        image_path: "images/silhouette-g1f9239d59_640.png",
      },
      {
        title: "Beats",
        image_path: "images/v2osk-1Z2niiBPg5A-unsplash.jpg",
      },
      {
        title: "Remembrance",
        image_path: "images/vintage-pocket-watch-ge23d15f23_640.jpg",
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
    await queryInterface.bulkDelete("albums", null, {
      where: {
        title: {
          [Op.in]: [
            "Dark",
            "StarStruck",
            "Power",
            "Pink",
            "Melody",
            "Just do it",
            "Beats",
            "Remembrance",
          ],
        },
      },
    });
  },
};
