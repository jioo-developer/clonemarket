import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const cart = useSelector((state: cartSelect) => state.cart);
  return (
    <header className="header">
      <div className="inner">
        <Link to="/">
          <h1 className="logo">
            <img src="/images/logo.png" alt="logo" />
          </h1>
        </Link>
        <div className="input_wrap">
          <input type="text" placeholder="상품을 검색해보세요!" />
          <img src="/images/icon-search.svg" alt="search" />
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
