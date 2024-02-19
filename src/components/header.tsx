import axios from "axios";
import React, { ChangeEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type detailProps = {
  productConnect: (params: productType[]) => void;
  products: productType[];
};

const Header = ({ productConnect, products }: detailProps) => {
  const cart = useSelector((state: cartSelect) => state.cart);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  function findItem(e?) {
    const result = products.filter((item) => item.name.includes(text));
    if (e.key === "Enter" && text !== "") {
      productConnect(result);
    } else if (e === "click") {
      productConnect(result);
    }
  }

  function initialProduct() {
    axios.get("/data/products.json").then((data) => {
      productConnect(data.data.products);
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
    });
  }
  return (
    <header className="header">
      <div className="inner">
        <Link to="/">
          <h1 className="logo" onClick={initialProduct}>
            <img src="/images/logo.png" alt="logo" />
          </h1>
        </Link>
        <div className="input_wrap">
          <input
            type="text"
            placeholder="상품을 검색해보세요!"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            ref={inputRef}
            onKeyPress={findItem}
          />
          <button onClick={() => findItem("click")}>
            <img src="/images/icon-search.svg" alt="search" />
          </button>
        </div>
      </div>

      <div className="menu">
        <Link to="/cart">
          <div className="shopping_cart">
            <img src="/images/icon-shopping-cart.svg" alt="cart" />
            <span>장바구니</span>
            {cart.length >= 1 ? (
              <div className="new_shopping_cart">
                <p>{cart.length}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
