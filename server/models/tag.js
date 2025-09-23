"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Product, {
        through: "ProductTags",
        foreignKey: "tag_id",
        otherKey: "product_id",
      });
    }
  }
  Tag.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tag",
      tableName: "Tags",
      underscored: true,
      timestamps: true,
    }
  );
  return Tag;
};
