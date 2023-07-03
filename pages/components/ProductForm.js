/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: existingTitle,
  image: existingImage,
  description: existingDescription,
  price: existingPrice,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [image, setImage] = useState(existingImage || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const data = { title, description, price, image };
  const saveProduct = async (ev) => {
    ev.preventDefault();
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  };
  if (goToProducts) {
    router.push("/products");
  }

  const uploadImages = async (ev) => {
    ev.preventDefault();
    const files = ev.target?.files;
    if (files.length > 0) {
      setLoading(true);
      const formData = new FormData();
      for (const file of files) {
        formData.append("file", file);
      }
      const res = await axios.post("/api/upload", formData);
      setImage((oldImages) => [...oldImages, ...res.data.links]);
      setLoading(false);
    }
  };
  const updateImagesOrder = (newImages) => {
    setImage(newImages);
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Product image</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          className="flex flex-wrap gap-2"
          list={image}
          setList={updateImagesOrder}
        >
          {!!image?.length &&
            image.map((link) => (
              <div
                key={link}
                className="h-24 bg-white p-4 shadow-sm rounded-sm "
              >
                <img src={link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {loading && (
          <div className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        <label className="w-24 h-24  bg-gray-200 flex flex-col items-center justify-center rounded-xl text-sm gap-1 text-gray-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <div>
            <input type="file" onChange={uploadImages} className="hidden" />
          </div>
        </label>
        {!image && <div>No photos in this product</div>}
      </div>
      <label>Product description</label>
      <textarea
        placeholder="product description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Product price</label>
      <input
        type="number"
        placeholder="product price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Add product
      </button>
    </form>
  );
};

export default ProductForm;
