"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      playlist.belongsTo(models.user, { foreignKey: "user_id" });

      playlist.belongsToMany(models.song, {
        through: models.song_playlist_join,
      });
    }
  }
  playlist.init(
    {
      title: DataTypes.STRING(50),
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "playlist",
    }
  );
  return playlist;
};
