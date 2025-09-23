const ServerError = require("../Errors/errorClas");
const {
  getCategoryId,
  insertingTags,
  creatingProducts,
} = require("../services/products.service");
const { getUserById } = require("../services/users.service");

const createProducts = async (req, res, next) => {
  try {
    // file uploaded
    const { filename } = req.file;
    // product details
    const { name, description, price, stock, tags, category } = req.body;

    // checking if the user is allowed to create a product
    const user = await getUserById(req.userId);
    if (user.role != "admin" && user.role != "manager")
      return next(
        new ServerError("You are not allowed to create a product", "user", 403)
      );

    // getting the category id
    const categoryId = await getCategoryId(category);

    // inserting tags
    const gettingTagsIds = await insertingTags(JSON.parse(tags));

    // creating the product
    await creatingProducts({
      name,
      description,
      price,
      stock,
      tags: gettingTagsIds,
      category_id: categoryId,
      filename,
    });

    return res.status(201).json({ message: "Product created" });
  } catch (error) {
    console.log(error);
    return next(new ServerError("Internal server error", "server", 500));
  }
};

module.exports = { createProducts };
