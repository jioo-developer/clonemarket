import "./App.css";
import React from "react";
import Home from "./components/Home.tsx";
import Detail from "./components/detail.tsx";
import Cart from "./components/Cart.tsx";
import Header from "./components/header.tsx";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState<productType[]>([]);
  const [cart, setCart] = useState<productType[]>([]);

  // 3자리 마다 콤마 찍는 함수
  const convertPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const cartConnect = (value: productType[]) => {
    setCart(value);
  };

  useEffect(() => {
    axios.get("/data/products.json").then((data) => {
      setProducts(data.data.products);
    });
  }, []);

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route
          path="/"
          element={<Home convertPrice={convertPrice} products={products} />}
        ></Route>
        <Route
          path="/product/:id"
          element={
            <Detail
              convertPrice={convertPrice}
              cart={cart}
              cartConnect={cartConnect}
              products={products}
            />
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              convertPrice={convertPrice}
              cartConnect={cartConnect}
            />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
