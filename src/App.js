import "./App.css";
import Home from "./components/Home";
import Detail from "./components/detail";
import Cart from "./components/Cart";
import { BrowserRouter, Route, Rotues, Routes } from "react-router-dom";
import { useState } from "react";
function App() {
  const [cart, setCart] = useState([]);
  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home convertPrice={convertPrice} />}></Route>
        <Route
          path="/product/:id"
          element={
            <Detail convertPrice={convertPrice} cart={cart} setCart={setCart} />
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
