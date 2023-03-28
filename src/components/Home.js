import React from "react";
import Product from "./Product";

const Home = ({ convertPrice, products }) => {
  return <Product products={products} convertPrice={convertPrice} />;
};

export default Home;
