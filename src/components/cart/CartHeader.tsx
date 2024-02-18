import React, { ChangeEvent } from "react";
const CartHeader = ({
  isAllChecked,
  AllChecked,
}: {
  isAllChecked: boolean;
  AllChecked: (e: ChangeEvent) => void;
}) => {
  return (
    <>
      <header
        className="header"
        style={{
          maxWidth: 1280,
        }}
      >
        <h1>장바구니</h1>
      </header>
      <div className="cart_title_wrap">
        <div className="tab_title">
          <input
            type="checkbox"
            onChange={(e: ChangeEvent) => AllChecked(e)}
            checked={isAllChecked}
          />
          <span>상품정보</span>
          <span>수량</span>
          <span>상품금액</span>

          <p>전체선택</p>
        </div>
      </div>
    </>
  );
};

export default CartHeader;
