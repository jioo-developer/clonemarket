import React from "react";

type billProps = {
  billConnect: (value: boolean) => void;
};

const CartBill = ({ billConnect }: billProps) => {
  function toggle() {
    billConnect(false);
  }

  function order() {
    const select = window.confirm("이렇게 주문할까요?");
    if (select) {
      window.alert("주문이 완료 되었습니다.");
      toggle();
    }
  }
  return (
    <div className="bill_wrap">
      <div className="bill-header">
        <p>주문하기</p>{" "}
        <button onClick={() => toggle()}>
          <img src="/images/close.png" />
        </button>
      </div>
      <div className="order-userInfo mb30">
        <div className="in_wrap">
          <details className="userName">
            <summary className="bold">주문자 정보</summary>
            <input type="text" placeholder="주문자 이름" />
            <input type="text" placeholder="주문자 전화번호" />
            <input type="text" placeholder="주문자 주소" />
            <button>입력완료</button>
          </details>
        </div>
      </div>

      <div className="order-request mb30 pdt30 pdb30 bgwhite ">
        <div className="in_wrap">
          <p className="bold">배송 요청사항</p>
          <input type="text" />
        </div>
      </div>
      <div className="order-contents mb30 bgwhite">
        <div className="conheader bold pdt30 pdb30">주문 상품 정보</div>
        <p className="in_wrap pdb30">회사명</p>
        <div className="order-inCon in_wrap">
          <figure>
            <img src="sadasdsa.jpg" />
          </figure>
          <figcaption className="item-info">
            <p>title</p>
            <p>length</p>
            <p>price</p>
          </figcaption>
        </div>
      </div>

      <div className="order-pay bgwhite mb30">
        <p className="conheader">결제수단</p>
        <ul className="pdb30">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="order-discount bgwhite mb30">
        <div className="in_wrap">
          <p className="bold">할인</p>
          <p className="bold">
            <span>9%</span>&nbsp;&nbsp;할인
          </p>
        </div>
      </div>
      <div className="order-resultPrice bgwhite mb30">
        <p className="in_wrap bold">
          최종 결제금액 <span style={{ marginLeft: 7 }}>00000</span>&nbsp;원
        </p>
      </div>

      <button className="result-order btn_buy mb30" onClick={order}>
        주문하기
      </button>
    </div>
  );
};

export default CartBill;
