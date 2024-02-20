import React from "react";

const CartBill = () => {
  return (
    <div className="bill_wrap">
      <div className="bill-header">
        <p>주문하기</p>{" "}
        <button>
          <img src="/images/close.png" />
        </button>
      </div>
      <div className="order-userInfo">
        <details className="userName">
          <summary>주문자 정보</summary>
          <input type="text" placeholder="주문자 이름" />
          <input type="text" placeholder="주문자 전화번호" />
          <input type="text" placeholder="주문자 주소" />
        </details>
      </div>
      <div className="order-request">
        <p>배송 요청사항</p>
        <input type="text" />
      </div>
      <div className="order-contents">
        <p>회사명</p>
        <div className="order-inCon">
          <figure></figure>
          <figcaption>
            <p>title</p>
            <p>length</p>
            <p>price</p>
          </figcaption>
        </div>
        <div className="order-pay">
          <p>결제수단</p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="order-discount">
          <p>할인</p>
          <p>할인금액</p>
        </div>
        <div className="order-resultPrice">
          <p>최종 결제금액 00000</p>
        </div>
        <div className="order-agree">
          <input type="checkbox" />
          <div className="agree-in">
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
          </div>
        </div>
        <button className="result-order"></button>
      </div>
    </div>
  );
};

export default CartBill;
