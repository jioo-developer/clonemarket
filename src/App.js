import "./App.css";
import Home from "./components/Home";
import Detail from "./components/detail";
import Cart from "./components/Cart";
import { Header } from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    axios.get("/data/products.json").then((data) => {
      setProducts(data.data.products);
    });
  }, []);
  return (
    <BrowserRouter>
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
              setCart={setCart}
              products={products}
            />
          }
        ></Route>
        <Route
          path="/cart"
          element={Cart}
          cart={cart}
          setCart={setCart}
          convertPrice={convertPrice}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
