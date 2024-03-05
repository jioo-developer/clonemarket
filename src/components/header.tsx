import axios from "axios";
import React, { ChangeEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { productType } from "../interfaceModule";
import { useMyContext } from "../module/MyContext.tsx";

type detailProps = {
  productConnect: (params: productType[]) => void;
  products: productType[];
};

const Header = ({ productConnect, products }: detailProps) => {
  const { cartData } = useMyContext();
  const cart = cartData.cart;
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function findItem(e: React.KeyboardEvent<HTMLInputElement> | string) {
    const result = products.filter((item) => item.name.includes(text));
    if (typeof e === "object" && e.key === "Enter" && text !== "") {
      productConnect(result);
    } else if (typeof e === "string" && e === "click") {
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
      <div className="logo-wrap">
        <Link to="/">
          <h1 className="logo" onClick={initialProduct}>
            <img src="/images/logo.jpg" alt="logo" />
          </h1>
        </Link>
        <p>shop</p>
      </div>

      <div className="inner">
        <div className="input_wrap">
          <input
            type="text"
            placeholder="상품을 검색해보세요!"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            ref={inputRef}
            onKeyPress={(e) => findItem(e)}
          />
          <button onClick={() => findItem("click")}>
            <img src="/images/icon-search.svg" alt="search" />
          </button>
        </div>
        <div className="menu">
          <Link to="/cart">
            <div className="shopping_cart">
              <img src="/images/shopping-bag.png" alt="cart" />
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
      </div>
    </header>
  );
};

export default Header;
