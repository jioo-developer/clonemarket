import React, { useState } from "react";
import { useLocation } from "react-router-dom";

interface detailProps extends homeProps {
  cart: any[];
  cartConnect: (params: productType[]) => void;
}

const Detail = ({ convertPrice, cart, products, cartConnect }: detailProps) => {
  const id: string = useLocation().state.id;
  const [count, setCount] = useState(1);

  const handleQuantity = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  const setQuantity = (id, quantity, cartItem) => {
    const found2: productType = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found2);
    //found2가 배열의 어느 위치에 있는 지 찾아줌
    const addQuantity: productType = cartItem;
    addQuantity.quantity = quantity;
    cartConnect([...cart.slice(0, idx), addQuantity, ...cart.slice(idx + 1)]);
    //...cart.slice(0,idx) 는 0 부터 idx 이전까지 추출하여 새로운 배열을 만들어냄 // 0에서 해당까지 자른다는게 아님
    //...cart.slice(idx+1,end 안써주기 때문에 끝까지)
    // 첫번째가 idx 전까지 이기 때문에 넣고, addQiantity라고 idx를 넣어주고 나머지 idx + 1 부터 끝까지 마지막으로 넣어줌
  };

  const handleCart = () => {
    const cartItem: productType = item();
    const found: productType = cart.find((el) => el.id === cartItem.id);
    if (found) {
      setQuantity(found.id, found.quantity + count, cartItem);
    } else {
      cartConnect([...cart, cartItem]);
    }
  };

  function item() {
    const initialData: productType = {
      id: 0,
      name: "",
      provider: "",
      price: 0,
      image: "",
      quantity: 0,
    };
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
                <p>택배배송 / 무료배송</p>
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
                <button className="btn_buy">바로 구매</button>
                <button
                  className="btn_cart"
                  onClick={() => {
                    handleCart();
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
