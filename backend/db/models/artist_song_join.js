'use strict';
const {
  Model
} = require('sequelize');
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
  artist_song_join.init({
    artist_id: DataTypes.INTEGER,
    song_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'artist_song_join',
  });
  return artist_song_join;
};