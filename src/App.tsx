import "./App.css";
import React from "react";
import Home from "./components/Home.tsx";
import Detail from "./components/detail.tsx";
import Cart from "./components/Cart.tsx";
import Header from "./components/Header.tsx";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MyContextProvider } from "./module/MyContext.tsx";

function App() {
  const [products, setProducts] = useState<productType[]>([]);

  function productConnect(value: productType[]) {
    setProducts(value);
  }

  useEffect(() => {
    axios.get("/data/products.json").then((data) => {
      setProducts(data.data.products);
    });
  }, []);

  return (
    <MyContextProvider>
      <Header productConnect={productConnect} products={products} />
      <Routes>
        <Route path="/" element={<Home products={products} />}></Route>
        <Route
          path="/product/:id"
          element={<Detail products={products} />}
        ></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </MyContextProvider>
  );
}

export default App;
