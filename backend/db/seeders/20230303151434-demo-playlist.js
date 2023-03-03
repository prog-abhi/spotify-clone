"use strict";

const { user: User, playlist: Playlist } = require("../models");

const userPlaylists = [
  {
    user: {
      username: "demo-user",
    },
    playlists: [
      {
        title: "demo-playlist-1",
      },
      {
        title: "demo-playlist-2",
      },
    ],
  },
  {
    user: {
      username: "demo-user-2",
    },
    playlists: [
      {
        title: "demo-playlist-3",
      },
      {
        title: "demo-playlist-4",
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
    for (let idx = 0; idx < userPlaylists.length; idx++) {
      const {
        user: { username },
        playlists,
      } = userPlaylists[idx];

      const userObj = await User.findOne({
        where: { username },
      });

      for (let playlistIdx = 0; playlistIdx < playlists.length; playlistIdx++) {
        await Playlist.create({
          ...playlists[playlistIdx],
          user_id: userObj.id,
        });
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
    for (let idx = 0; idx < userPlaylists.length; idx++) {
      const {
        user: { username },
        playlists,
      } = userPlaylists[idx];

      const userObj = await User.findOne({
        where: { username },
      });

      for (let playlistIdx = 0; playlistIdx < playlists.length; playlistIdx++) {
        await Playlist.destroy({
          where: {
            ...playlists[playlistIdx],
            user_id: userObj.id,
          },
        });
      }
    }
  },
};
