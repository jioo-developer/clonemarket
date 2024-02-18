import React from "react";

type cartListProps = {
  item: productType;
  convertPrice: (price: number) => string;
  handleQuantity: (id: number, quantity: number) => void;
  handleRemove: (productId: number) => void;
  handlerCheckList: (checked: boolean, productId: number) => void;
  checkLists: number[];
};

const CartList = ({
  item,
  convertPrice,
  handleQuantity,
  handleRemove,
  handlerCheckList,
  checkLists,
}: cartListProps) => {
  return (
    <section className="cart_product_list">
      <input
        type="checkbox"
        id={`${item.id}`}
        onChange={(e) => {
          handlerCheckList(e.currentTarget.checked, parseInt(e.target.id));
        }}
        checked={checkLists.includes(item.id) ? true : false}
      />
      <div className="cart_product_wrap">
        <div className="cart_product_image">
          <img src={item.image} alt="product-img" />
        </div>

        <div className="cart_product_info">
          <p className="seller_store">{item.provider}</p>
          <p className="product_name">{item.name}</p>
          <p className="price">{convertPrice(item.price)}원</p>
          <p className="delivery">택배배송</p>
        </div>
      </div>

      <div className="cart_product_count">
        <img
          className="minus"
          src="/images/icon-minus-line.svg"
          alt="minus"
          onClick={() => {
            if (item.quantity > 1) {
              handleQuantity(item.id, item.quantity - 1);
            }
          }}
        />

        <div className="count">
          <span>{item.quantity}</span>
        </div>
        <img
          className="plus"
          src="/images/icon-plus-line.svg"
          alt="plus"
          onClick={() => handleQuantity(item.id, item.quantity + 1)}
        />
      </div>

      <div className="cart_product_price">
        <p className="total_price"></p>
        <button className="btn_submit">주문하기</button>
      </div>

      <div className="product_remove" onClick={() => handleRemove(item.id)}>
        <img src="/images/icon-delete.svg" alt="delete" />
      </div>
    </section>
  );
};

export default CartList;
