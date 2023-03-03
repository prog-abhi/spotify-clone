"use strict";

const { artist: Artist, song: Song, artist_song_join } = require("../models");

const artistSongs = [
  {
    artist: {
      first_name: "Zaphod",
      last_name: "Beeb",
    },
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
    artist: {
      first_name: "Lionell",
      last_name: "Helmgart",
    },
    songs: [
      {
        title: "Ambient Dreamy Clouds",
      },
    ],
  },
  {
    artist: {
      first_name: "Satish",
      last_name: "MD",
    },
    songs: [
      {
        title: "Ambient Dreamy Clouds",
      },
    ],
  },
  {
    artist: {
      first_name: "Md.",
      last_name: "Ismail",
    },
    songs: [
      {
        title: "Energy Pill",
      },
    ],
  },
  {
    artist: {
      first_name: "Lily",
      last_name: "Koretkevich",
    },
    songs: [
      {
        title: "Can't Fall In Love",
      },
      {
        title: "In The Forest",
      },
    ],
  },
  {
    artist: {
      first_name: "Karen",
      last_name: "Gun",
    },
    songs: [
      {
        title: "Legendary Piano",
      },
    ],
  },
  {
    artist: {
      first_name: "Dong",
      last_name: "Lee",
    },
    songs: [
      {
        title: "Stuck In A Dream",
      },
    ],
  },
  {
    artist: {
      first_name: "Gun",
      last_name: "Park",
    },
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
    for (let idx = 0; idx < artistSongs.length; idx++) {
      const { artist, songs } = artistSongs[idx];
      const artistObj = await Artist.findOne({ where: { ...artist } });
      // console.log(artistObj);
      for (let songIdx = 0; songIdx < songs.length; songIdx++) {
        const song = songs[songIdx];
        const songObj = await Song.findOne({ where: { ...song } });
        // console.log(songObj);
        await artistObj.addSongs(songObj);
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
    for (let idx = 0; idx < artistSongs.length; idx++) {
      const { artist, songs } = artistSongs[idx];
      const artistObj = await Artist.findOne({ where: { ...artist } });
      for (let songIdx = 0; songIdx < songs.length; songIdx++) {
        const song = songs[songIdx];
        const songObj = await Song.findOne({ where: { ...song } });
        await artist_song_join.destroy({
          where: { artistId: artistObj.id, songId: songObj.id },
        });
      }
    }
  },
};
