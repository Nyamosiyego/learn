import React, { useEffect, useState } from "react";
import Layout from "./components/layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2/build";

const Categories = ({ swal }) => {
  const [name, setName] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const [categories, setCategories] = useState("");
  const [parent, setParent] = useState("" || null);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res = await axios.get("/api/categories");
    setName(res.data);
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const data = { name: categories, parent };
    if (editedCategory) {
      await axios.put("/api/categories", { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setCategories("");
    setParent("");
    getCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setCategories(category.name);
    setParent(category.parent?._id || "");
  };

  const deleteCategory = async (category) => {
    const res = await swal.fire({
      title: `Are you sure you want to delete ${category.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      reverseButtons: true,
      cancelButtonText: "No",
    });
    if (res.isConfirmed) {
      await axios.delete("/api/categories?_id=" + category._id);
      getCategories();
    }
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "New Category name"}
      </label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder={"Category name"}
          onChange={(e) => setCategories(e.target.value)}
          value={categories}
        />
        <select
          className="mb-0"
          onChange={(e) => setParent(e.target.value)}
          value={parent}
        >
          <option value="">No parent category</option>
          {name.length > 0 &&
            name.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
          </tr>
        </thead>
        <tbody>
          {name.length > 0 &&
            name.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.parent?.name || "No parent category"}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-primary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => (
  <Categories ref={ref} swal={swal} />
));
