"use strict";
const { Model, Op } = require("sequelize");
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

    toSafeObject() {
      const { username, email } = this;
      return {
        user: {
          username,
          email,
        },
      };
    }

    static async login({ credential, password }) {
      const userObj = await user.scope("admin").findOne({
        where: {
          [Op.or]: [{ username: credential }, { email: credential }],
        },
      });

      if (!userObj) {
        const err = new Error("Invalid credentials!");
        err.status = 401;
        throw err;
      } else {
        if (!user.checkPassword(password, userObj.hashed_password)) {
          const err = new Error("Invalid password!");
          err.status = 401;
          throw err;
        } else {
          const userObjToSend = await user.findByPk(userObj.id);
          return { user: userObjToSend };
        }
      }
    }

    static async signup({ username, first_name, last_name, email, password }) {
      const hashed_password = user.generateHashpassword(password);

      const userObj = await user.create({
        username,
        first_name,
        last_name,
        email,
        hashed_password,
      });

      return {
        status: "Success",
        msg: "New user added!",
        ...userObj.toSafeObject(),
      };
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
      defaultScope: {
        attributes: {
          exclude: ["email", "hashed_password"],
        },
      },
      scopes: {
        admin: {
          attributes: {
            exclude: [],
          },
        },
        user: {
          attributes: {
            exclude: ["hashed_password"],
          },
        },
      },
    }
  );
  return user;
};
