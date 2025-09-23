"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductTag.belongsTo(models.Product, { foreignKey: "product_id" });
      ProductTag.belongsTo(models.Tag, { foreignKey: "tag_id" });
    }
  }
  ProductTag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductTag",
      tableName: "ProductTags",
      // underscored: true,
      timestamps: true,
    }
  );
  return ProductTag;
};
