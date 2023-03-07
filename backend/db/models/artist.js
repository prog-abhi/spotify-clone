"use strict";
const { Model } = require("sequelize");
const validator = require("validator");
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
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 50],
          isAlpha: true,
        },
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 50],
          isAlpha: true,
        },
      },
      image_path: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          customValidator(value) {
            if (!validator.isAlphanumeric(value, "en-US", { ignore: "/\\" })) {
              throw new Error("Invalid path format!");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "artist",
    }
  );
  return artist;
};
