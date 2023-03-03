"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      artist.belongsToMany(models.song, {
        through: models.artist_song_join,
      });
    }
  }
  artist.init(
    {
      first_name: DataTypes.STRING(50),
      last_name: DataTypes.STRING(50),
      image_path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "artist",
    }
  );
  return artist;
};
