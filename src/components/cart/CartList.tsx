import React from "react";
const CartList = ({
  cart,
  convertPrice,
  handleQuantity,
  handleRemove,
  handlerCheckList,
  checkLists,
}) => {
  return (
    <section className="cart_product_list">
      <input
        type="checkbox"
        id={cart.id}
        onChange={(e) => {
          handlerCheckList(e.currentTarget.checked, parseInt(e.target.id));
        }}
        checked={checkLists.includes(cart.id) ? true : false}
      />
      <div className="cart_product_wrap">
        <div className="cart_product_image">
          <img src={cart.image} alt="product-img" />
        </div>

        <div className="cart_product_info">
          <p className="seller_store">{cart.provider}</p>
          <p className="product_name">{cart.name}</p>
          <p className="price">{convertPrice(cart.price)}원</p>
          <p className="delivery">택배배송</p>
        </div>
      </div>

      <div className="cart_product_count">
        <img
          className="minus"
          src="/images/icon-minus-line.svg"
          alt="minus"
          onClick={() => {
            handleQuantity("minus", cart.id, cart.quantity - 1);
          }}
        />

        <div className="count">
          <span>{cart.quantity}</span>
        </div>
        <img
          className="plus"
          src="/images/icon-plus-line.svg"
          alt="plus"
          onClick={() => handleQuantity("plus", cart.id, cart.quantity + 1)}
        />
      </div>

      <div className="cart_product_price">
        <p className="total_price"></p>
        <button className="btn_submit">주문하기</button>
      </div>

      <div className="product_remove" onClick={() => handleRemove(cart.id)}>
        <img src="/images/icon-delete.svg" alt="delete" />
      </div>
    </section>
  );
};

export default CartList;
