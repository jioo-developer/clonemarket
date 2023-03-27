import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";

const Home = ({ convertPrice }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/data/products.json").then((data) => {
      setProducts(data.data.products);
    });
  }, []);

  return <Product products={products} convertPrice={convertPrice} />;
};

export default Home;
