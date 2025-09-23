import api from "./api.service";

export const createProducts = async (
  file,
  name,
  description,
  category,
  price,
  stock,
  tags
) => {
  try {
    const newTags = tags.split(",").map((tag) => tag.trim());

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("tags", JSON.stringify(newTags));

    const res = await api.post("/private/products", formData);

    if (res.status != 201) return { ok: false, message: res.data.message };

    return { ok: true, message: res.data.message };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
