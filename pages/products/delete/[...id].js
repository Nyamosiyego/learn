import Layout from "@/pages/components/layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const DeleteProuductPage = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data?.title);
    });
  }, [id]);

  const deleteProduct = async () => {
    await axios.delete("/api/products?id=" + id);
    router.push("/products");
    };

  const goBack = () => {
    window.history.back();
  };
  return (
    <Layout>
      <h1 className="flex justify-center">Do you really want to delete &quot;{productInfo}&quot;?</h1>
      <div className="flex gap-2 justify-center">
          <button className="btn-red" onClick={deleteProduct}>Yes</button>
          <button onClick={goBack} className="btn-default">
            No
          </button>
      </div>
    </Layout>
  );
};

export default DeleteProuductPage;
