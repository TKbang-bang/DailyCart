"use strict";

const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      delete values.createdAt;
      delete values.updatedAt;
      return values;
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "manager", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
      name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstname} ${this.lastname}`.trim();
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
          user.email = user.email.toLowerCase();
          user.firstname =
            user.firstname.charAt(0).toUpperCase() +
            user.firstname.slice(1).toLowerCase();
          user.lastname =
            user.lastname.charAt(0).toUpperCase() +
            user.lastname.slice(1).toLowerCase();
        },
      },
    }
  );
  return User;
};
