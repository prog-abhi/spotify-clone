"use strict";
const { Model } = require("sequelize");
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
      title: DataTypes.STRING(50),
      image_path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "album",
    }
  );
  return album;
};
