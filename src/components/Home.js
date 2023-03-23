import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/data/products.json").then((data) => {
      setProducts(data.data.products);
    });
  }, []);

  return <Product products={products} />;
};

export default Home;
