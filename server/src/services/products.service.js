const {
  Category,
  Tag,
  sequelize,
  ProductTag,
  Product,
} = require("../../models");

const getCategoryId = async (category) => {
  try {
    // checking if the category exists
    const categoryExists = await Category.findOne({
      where: { name: category.toLowerCase() },
    });

    if (categoryExists) {
      return categoryExists.id;
    } else {
      // creating the category
      const newCategory = await Category.create({
        name: category.toLowerCase(),
      });
      return newCategory.id;
    }
  } catch (error) {
    console.log({ error });
    throw new Error(error);
  }
};

const insertingTags = async (tags) => {
  try {
    const tagIds = await Promise.all(
      tags.map(async (tag) => {
        // checking if the tag exists
        const tagExists = await Tag.findOne({
          where: { name: tag.toLowerCase() },
        });

        if (tagExists) {
          return tagExists.id;
        } else {
          // creating the tag
          const newTag = await Tag.create({ name: tag.toLowerCase() });
          return newTag.id;
        }
      })
    );

    return tagIds;
  } catch (error) {
    throw new Error(error);
  }
};

const creatingProducts = async (product) => {
  try {
    const { name, description, price, stock, tags, category_id, filename } =
      product;

    await sequelize.transaction(async (transaction) => {
      const product = await Product.create(
        {
          name,
          description,
          price,
          stock,
          category_id,
          image_url: filename,
        },
        { transaction }
      );

      await Promise.all(
        tags.map(async (tag) => {
          await ProductTag.create(
            {
              product_id: product.id,
              tag_id: tag,
            },
            { transaction }
          );
        })
      );
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getCategoryId,
  insertingTags,
  creatingProducts,
};
