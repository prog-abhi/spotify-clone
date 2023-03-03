"use strict";

const {
  song: Song,
  playlist: Playlist,
  song_playlist_join,
} = require("../models");

const songsPlaylists = [
  {
    song: {
      title: "Sinister Power Rising",
    },
    playlists: [
      {
        title: "demo-playlist-1",
      },
      { title: "demo-playlist-3" },
    ],
  },
  {
    song: {
      title: "Energy Pill",
    },
    playlists: [
      {
        title: "demo-playlist-1",
      },
    ],
  },
  {
    song: {
      title: "Can't Fall In Love",
    },
    playlists: [
      {
        title: "demo-playlist-2",
      },
      {
        title: "demo-playlist-4",
      },
    ],
  },
  {
    song: {
      title: "Electric",
    },
    playlists: [
      {
        title: "demo-playlist-2",
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
    for (let idx = 0; idx < songsPlaylists.length; idx++) {
      const {
        song: { title },
        playlists,
      } = songsPlaylists[idx];
      const songObj = await Song.findOne({ where: { title } });
      for (let playlistIdx = 0; playlistIdx < playlists.length; playlistIdx++) {
        const { title: playlistTitle } = playlists[playlistIdx];
        const playlistObj = await Playlist.findOne({
          where: { title: playlistTitle },
        });
        await playlistObj.addSong(songObj);
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
    for (let idx = 0; idx < songsPlaylists.length; idx++) {
      const {
        song: { title },
        playlists,
      } = songsPlaylists[idx];
      const songObj = await Song.findOne({ where: { title } });
      for (let playlistIdx = 0; playlistIdx < playlists.length; playlistIdx++) {
        const { title: playlistTitle } = playlists[playlistIdx];
        const playlistObj = await Playlist.findOne({
          where: { title: playlistTitle },
        });
        await song_playlist_join.destroy({
          where: {
            songId: songObj.id,
            playlistId: playlistObj.id,
          },
        });
      }
    }
  },
};
