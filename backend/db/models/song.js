"use strict";
const { Model } = require("sequelize");
const validator = require("validator");
module.exports = (sequelize, DataTypes) => {
  class song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      song.belongsTo(models.album, {
        foreignKey: "album_id",
        allowNull: false,
        onDelete: "cascade",
        hooks: true,
      });

      song.belongsToMany(models.playlist, {
        through: models.song_playlist_join,
      });

      song.belongsToMany(models.artist, {
        through: models.artist_song_join,
      });
    }
  }
  song.init(
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [3, 50],
          customIsAlphaNumeric(value) {
            if (!validator.isAlphanumeric(value, "en-US", { ignore: " -" })) {
              throw new Error(
                "Title names can only contain alphanumeric characters along with spaces and hyphen!"
              );
            }
          },
        },
      },
      lyrics: {
        type: DataTypes.STRING,
        validate: {
          customIsAlphaNumeric(value) {
            if (!validator.isAlphanumeric(value, "en-US", { ignore: " -" })) {
              throw new Error(
                "Title names can only contain alphanumeric characters along with spaces and hyphen!"
              );
            }
          },
        },
      },
      album_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "song",
    }
  );
  return song;
};
