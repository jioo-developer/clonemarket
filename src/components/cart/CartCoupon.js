import React from "react";
const cartCoupon = ({ coupon }) => {
  return (
    <div className="cart_couponWrap">
      <div className="couponBtn" onClick={coupon}>
        쿠폰받기
      </div>
      <p>3만원 이상 구매 시 배송비 무료입니다</p>
    </div>
  );
};

export default cartCoupon;
