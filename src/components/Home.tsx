import React from "react";
import Product from "./Product.tsx";

const Home = ({ convertPrice, products }: homeProps) => {
  return <Product products={products} convertPrice={convertPrice} />;
};

export default Home;
