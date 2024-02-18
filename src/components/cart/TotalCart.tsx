import React from "react";
import { useEffect, useState } from "react";

type TotalCartProps = {
  total: number;
  cart: productType[];
  convertPrice: (price: number) => string;
  randomNum: number;
  buyitem: productType[];
  totalConnect: (value: number) => void;
};

const TotalCart = ({
  total,
  cart,
  convertPrice,
  randomNum,
  buyitem,
  totalConnect,
}: TotalCartProps) => {
  const [initialPrice, setInitial] = useState(0);
  const delivery = 3000;
  useEffect(() => {
    if (buyitem.length) {
      const sum = buyitem.map((item) => item[0].price * item[0].quantity);
      const itemTotal = sum.reduce((acc, cur) => acc + cur);

      if (itemTotal <= 0) {
        totalConnect(0);
      } else {
        setInitial(itemTotal);

        if (randomNum > 0) {
          const discount =
            itemTotal - Math.round(itemTotal * (randomNum / 100));
          if (discount > delivery * 10) {
            totalConnect(discount);
          } else {
            totalConnect(discount + delivery);
          }
        } else {
          if (itemTotal > delivery * 10) {
            totalConnect(itemTotal);
          } else {
            totalConnect(itemTotal + delivery);
          }
        }
      }
    } else {
      totalConnect(0);
      setInitial(0);
    }
  }, [buyitem, cart, total, totalConnect, randomNum]);
  return (
    <div className="totals">
      <div className="total_price">
        <p className="cart_product_total_price">총 상품금액</p>
        <p className="cart_product_price">{convertPrice(initialPrice)}</p>
      </div>
      <div className="pay_minus">
        <img src="/images/icon-minus-line.svg" alt="minus" />
      </div>
      <div className="sale">
        <p className="cart_product_sale">상품 할인</p>
        <p className="cart_product_sale_price">
          {randomNum}
          {randomNum <= 0 ? "" : "%"}
        </p>
      </div>
      <div className="pay_plus">
        <img src="/images/icon-plus-line.svg" alt="plus" />
      </div>
      <div className="delivery">
        <p className="cart_product_delivery">배송비</p>
        <p className="cart_product_delivery_price">
          {total > delivery * 10 ? 0 : delivery}
        </p>
      </div>

      <div className="payment">
        <p className="cart_prouct_payment">결제 예정 금액</p>
        <p className="cart_prouct_payment_price">{convertPrice(total)}</p>
      </div>
    </div>
  );
};

export default TotalCart;
