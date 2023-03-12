"use strict";

const { album, song } = require("../models");

const albumSongs = [
  {
    albumTitle: "Dark",
    songs: [
      {
        title: "Sinister Power Rising",
      },
      {
        title: "Black Box",
      },
    ],
  },
  {
    albumTitle: "StarStuck",
    songs: [
      {
        title: "Ambient Dreamy Clouds",
      },
    ],
  },
  {
    albumTitle: "Power",
    songs: [
      {
        title: "Energy Pill",
      },
    ],
  },
  {
    albumTitle: "Pink",
    songs: [
      {
        title: "Cant Fall In Love",
      },
    ],
  },
  {
    albumTitle: "Melody",
    songs: [
      {
        title: "In The Forest",
      },
    ],
  },
  {
    albumTitle: "Just do it",
    songs: [
      {
        title: "Legendary Piano",
      },
    ],
  },
  {
    albumTitle: "Beats",
    songs: [
      {
        title: "Stuck In A Dream",
      },
    ],
  },
  {
    albumTitle: "Remembrance",
    songs: [
      {
        title: "Electric",
      },
      {
        title: "Stomp Rap",
      },
    ],
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
    for (let idx = 0; idx < albumSongs.length; idx++) {
      const { albumTitle, songs } = albumSongs[idx];
      const albumObj = await album.findOne({ where: { title: albumTitle } });
      for (let songIdx = 0; songIdx < songs.length; songIdx++) {
        const songObj = songs[songIdx];
        await song.create({ ...songObj, album_id: albumObj.id });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let idx = 0; idx < albumSongs.length; idx++) {
      const { albumTitle, songs } = albumSongs[idx];
      const albumObj = await album.findOne({ where: { title: albumTitle } });
      for (let songIdx = 0; songIdx < songs.length; songIdx++) {
        const songObj = songs[songIdx];
        await song.destroy({ where: { ...songObj, album_id: albumObj.id } });
      }
    }
  },
};
