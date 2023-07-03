import React from "react";
import ProductForm from "../components/ProductForm";
import Layout from "../components/layout";

const NewProduct = () => {
 return (
 <Layout>
  <h1>Add new product</h1>
   <ProductForm />
 </Layout>
 )
};

export default NewProduct;
