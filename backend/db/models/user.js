"use strict";
const { Model } = require("sequelize");
const validator = require("validator");
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
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [5, 50],
          isNotEmail(value) {
            if (validator.isEmail(value)) {
              throw new Error("Username cannot be a email address!");
            }
          },
        },
      },
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
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      hashed_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
