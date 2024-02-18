import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Detail = ({ convertPrice, cart, products, cartConnect }: detailProps) => {
  const id: string = useLocation().state.id;
  const [count, setCount] = useState(1);

  const initialData: productType = {
    id: 0,
    name: "",
    provider: "",
    price: 0,
    image: "",
    quantity: 0,
    quick: false,
  };

  const handleQuantity = (type: string) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count > 1) {
        setCount(count - 1);
      }
    }
  };

  const setQuantity = (overlapProduct: productType) => {
    const idx = cart.indexOf(overlapProduct);
    const newNum = overlapProduct;
    newNum.quantity = newNum.quantity + count;
    const splice = cart.splice(idx, 1, newNum);
    cartConnect(splice);
  };

  const handleCart = (id: number) => {
    if (cart.length === 0) {
      const num = item();
      num.quantity = num.quantity + 1;
      cartConnect([num]);
    } else {
      const found = cart.filter((item) => item.id === id);
      if (found.length > 0) {
        setQuantity(found[0]);
      } else {
        const num = item();
        num.quantity = num.quantity + 1;
        cartConnect([...cart, num]);
      }
    }
  };

  function item() {
    if (products.length > 0) {
      const result = products.filter((item) => item.id === parseInt(id))[0];
      return Object.entries(result).length > 0 ? result : initialData;
    } else {
      return initialData;
    }
  }

  return (
    <>
      {item() ? (
        <>
          <main className="main">
            <section className="in_product">
              <div className="product_img">
                <img src={item().image} alt="product" />
              </div>
            </section>
            <section className="in_product">
              <div className="product_info">
                <p className="seller_store">{item().provider}</p>
                <p className="product_name">{item().name}</p>
                <span className="price">
                  {item().price}
                  <span className="unit">원</span>
                </span>
              </div>

              <div className="delivery">
                <p
                  style={
                    item().quick
                      ? { color: "cadetblue", fontWeight: 600 }
                      : { color: "#333" }
                  }
                >
                  택배배송 /
                </p>
                <p
                  style={
                    !item().quick
                      ? { color: "cadetblue", fontWeight: 600 }
                      : { color: "#333" }
                  }
                >
                  &nbsp;빠른배송
                </p>
              </div>

              <div className="line"></div>

              <div className="amount">
                <img
                  className="minus"
                  src="/images/icon-minus-line.svg"
                  alt="minus"
                  onClick={() => handleQuantity("minus")}
                />

                <div className="count">
                  <span>{count}</span>
                </div>

                <img
                  className="plus"
                  src="/images/icon-plus-line.svg"
                  alt="plus"
                  onClick={() => handleQuantity("plus")}
                />
              </div>

              <div className="line"></div>

              <div className="sum">
                <div>
                  <span className="sum_price">총 상품 금액</span>
                </div>

                <div className="total_info">
                  <span className="total">
                    총 수량 <span className="total_count">{count}개</span>
                  </span>
                  <span className="total_price">
                    {convertPrice(item().price * count)}
                    <span className="total_unit">원</span>
                  </span>
                </div>
              </div>

              <div className="btns">
                <button
                  className="btn_buy"
                  onClick={() => {
                    handleCart(item().id);
                  }}
                >
                  장바구니
                </button>
              </div>
            </section>
          </main>
        </>
      ) : (
        "상품을 준비중입니다"
      )}
    </>
  );
};

export default Detail;
