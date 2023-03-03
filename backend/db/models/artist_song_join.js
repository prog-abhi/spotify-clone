"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class artist_song_join extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  artist_song_join.init(
    {
      artistId: {
        type: DataTypes.INTEGER,
        references: { model: "artists", key: "id" },
        onDelete: "cascade",
      },
      songId: {
        type: DataTypes.INTEGER,
        references: { model: "songs", key: "id" },
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "artist_song_join",
    }
  );
  return artist_song_join;
};
