import React from "react";
import { cartSelect } from "../../interfaceModule";
import { useSelector } from "react-redux";
import convertPrice from "../../module/convertPrice.ts";
type billProps = {
  billConnect: (value: boolean) => void;
  random: number;
  total: number;
};

const CartBill = ({ billConnect, random, total }: billProps) => {
  const cart = useSelector((state: cartSelect) => state.cart);

  function toggle() {
    billConnect(false);
  }

  function order() {
    // 뭐 cart 랑 input type=text 들 useState로 다 받고 최종 가격 + 결제수단명 받고 전부 객체에 넣어서 쏘면 될듯
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
          <img src="/images/close.png" alt="" />
        </button>
      </div>
      <div className="order-userInfo mb30">
        <div className="in_wrap">
          <details className="userName">
            <summary className="bold">주문자 정보&nbsp;(입력)</summary>
            <input type="text" placeholder="주문자 이름" />
            <input type="text" placeholder="주문자 전화번호" />
            <input type="text" placeholder="주문자 주소" />
            <button>입력완료</button>
          </details>
        </div>
      </div>

      <div className="order-request mb30 pdt30 pdb30 bgwhite">
        <div className="in_wrap">
          <p className="bold">배송 요청사항</p>
          <input type="text" placeholder="요청사항을 적어주세요" />
        </div>
      </div>
      <div className="order-contents pdb30 bgwhite">
        <div className="conheader bold pdt30 pdb30">주문 상품 정보</div>
        {cart.length > 0
          ? cart.map((item, index) => {
              return (
                <div className="order-conMap" key={index}>
                  <p className="in_wrap">{item.provider}</p>
                  <div className="order-inCon in_wrap">
                    <figure>
                      <img src={item.image} alt="" />
                    </figure>
                    <figcaption className="item-info">
                      <p>{item.name}</p>
                      <p>{item.quantity}개</p>
                      <p>{convertPrice(item.price * item.quantity)}원</p>
                    </figcaption>
                  </div>
                </div>
              );
            })
          : null}
      </div>

      <div className="order-pay bgwhite mb30">
        <p className="conheader">결제수단</p>
        <img src="/images/pay.jpg" alt="" />
      </div>
      <div className="order-discount bgwhite mb30">
        <div className="in_wrap">
          <p className="bold">할인</p>
          <p className="bold">
            <span>{random}%</span>&nbsp;&nbsp;할인
          </p>
        </div>
      </div>
      <div className="order-resultPrice bgwhite mb30">
        <p className="in_wrap bold">
          최종 결제금액{" "}
          <span style={{ marginLeft: 7 }}>
            {convertPrice(Math.round(total / 10) * 10)}
          </span>
          &nbsp;원
        </p>
      </div>

      <button className="result-order btn_buy mb30" onClick={order}>
        주문하기
      </button>
    </div>
  );
};

export default CartBill;
