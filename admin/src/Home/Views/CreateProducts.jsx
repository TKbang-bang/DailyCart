import React, { useRef, useState } from "react";
import { DeleteIcon, SwitchIcon } from "../../svg/svg";
import "./views.css";
import { toast } from "sonner";
import { createProducts } from "../../Services/products.service";

function CreateProducts() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [tags, setTags] = useState("");
  const fileReference = useRef(null);

  const handleDeleteImage = () => {
    setFile(null);
    document.getElementById("file").value = null;
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);

    if (!name) {
      const filename = e.target.files[0].name.split(".")[0];
      setName(
        filename
          .replace(/[-_]/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !name || !description || !category || !price || !stock) {
      return toast.error("All fields are required");
    }

    try {
      const res = await createProducts(
        file,
        name,
        description,
        category,
        price,
        stock,
        tags
      );

      if (!res.ok) throw new Error(res.message);

      toast.success(res.message);
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setStock("");
      setTags("");
      setFile(null);
      document.getElementById("file").value = null;
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <section className="create_products">
      <form onSubmit={handleSubmit}>
        <article className="img_container">
          <input
            type="file"
            accept="image/*"
            id="file"
            ref={fileReference}
            onChange={handleChangeFile}
          />
          {file ? (
            <>
              <img src={URL.createObjectURL(file)} alt="" />
              <div className="btns">
                <span
                  className="switch"
                  onClick={() => fileReference.current.click()}
                >
                  <SwitchIcon />
                </span>
                <span className="delete" onClick={handleDeleteImage}>
                  <DeleteIcon />
                </span>
              </div>
            </>
          ) : (
            <label htmlFor="file" className="upload">
              <span>+</span>
            </label>
          )}
        </article>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button type="submit" className="submit">
          Create Product
        </button>
      </form>
    </section>
  );
}

export default CreateProducts;
