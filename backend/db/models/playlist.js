"use strict";
const { Model } = require("sequelize");
const validator = require("validator");
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      playlist.belongsTo(models.user, {
        foreignKey: "user_id",
        onDelete: "cascade",
        hooks: true,
      });

      playlist.belongsToMany(models.song, {
        through: models.song_playlist_join,
      });
    }
  }
  playlist.init(
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isNumeric: true },
      },
    },
    {
      sequelize,
      modelName: "playlist",
    }
  );
  return playlist;
};
