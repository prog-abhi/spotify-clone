"use strict";
const { Model } = require("sequelize");
const validator = require("validator");
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      album.hasMany(models.song, {
        foreignKey: "album_id",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  album.init(
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
      modelName: "album",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      scopes: {
        admin: {
          attributes: {
            exclude: [],
          },
        },
      },
    }
  );
  return album;
};
