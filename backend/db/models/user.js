"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.playlist, {
        foreignKey: "user_id",
        onDelete: "cascade",
        hooks: true,
      });
    }

    static generateHashpassword(password) {
      return bcrypt.hashSync(password);
    }

    static checkPassword(password, hashed_password) {
      return bcrypt.compareSync(password, hashed_password);
    }
  }
  user.init(
    {
      username: DataTypes.STRING(50),
      first_name: DataTypes.STRING(50),
      last_name: DataTypes.STRING(50),
      email: DataTypes.STRING,
      hashed_password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
