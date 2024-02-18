import React, { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import CartHeader from "./cart/CartHeader.tsx";
import CartList from "./cart/CartList.tsx";
import TotalCart from "./cart/TotalCart.tsx";
import CartCoupon from "./cart/CartCoupon.tsx";

const Cart = ({ cart, convertPrice, cartConnect }) => {
  const [total, setTotal] = useState<number>(0);
  const [checkLists, setCheckLists] = useState<number[]>([]);
  const [randomNum, setRandom] = useState(0);

  const handleQuantity = (id: number, quantity: number) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const newNum = found;
    newNum.quantity = quantity;
    const splice = cart.splice(idx, 1, newNum);
    cartConnect(splice);
  };

  const handleRemove = (productId: number) => {
    cartConnect(cart.filter((cart) => cart.id !== productId));
  };

  const handlerCheckList = (checked: boolean, productId: number) => {
    if (checked) {
      setCheckLists([...checkLists, productId]);
    } else {
      setCheckLists(checkLists.filter((item) => item !== productId));
      //filter 안의 item parameter와 id가 같지 않은 것만 남긴다 = 같은 거 삭제
    }
  };

  const AllChecked = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      const clearItem: number[] = [];
      cart.forEach((element) => clearItem.push(element.id));
      setCheckLists([...clearItem]);
    } else {
      setCheckLists([]);
    }
  };

  const coupon = () => {
    if (randomNum === 0) {
      const num = Math.floor(Math.random() * (10 - 5) + 5);
      setRandom(num);
      localStorage.setItem("couponNum", `${num}`);
      alert(`${num}% 할인 쿠폰이 발급되었습니다`);
    }
  };

  const totalConnect = (value: number) => {
    setTotal(value);
  };

  const buyitem: productType[] = checkLists.map((item) => {
    return cart.filter((el) => el.id === item);
  });

  const isAllChecked =
    cart.length === checkLists.length && checkLists.length !== 0;
  //전체를 체크 해야되니 :  장바구니에 저장된 데이터의 값과 체크된 갯수가 같으면서 체크리스트의 갯수가 0개가 아닐때

  useEffect(() => {
    const loadCoupon = localStorage.getItem("couponNum");
    const isCoupon: string = JSON.parse(loadCoupon || "{}");
    if (typeof isCoupon === "number") {
      setRandom(parseInt(isCoupon));
    }
  }, []);

  return (
    <>
      <CartHeader AllChecked={AllChecked} isAllChecked={isAllChecked} />
      {cart.length ? (
        cart.map((item: productType) => {
          return (
            <CartList
              item={item}
              convertPrice={convertPrice}
              handleQuantity={handleQuantity}
              handlerCheckList={handlerCheckList}
              handleRemove={handleRemove}
              checkLists={checkLists}
            />
          );
        })
      ) : (
        <div className="not">
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
      )}

      {cart.length ? (
        <>
          <CartCoupon coupon={coupon} />
          <TotalCart
            cart={cart}
            total={total}
            totalConnect={totalConnect}
            convertPrice={convertPrice}
            randomNum={randomNum}
            buyitem={buyitem}
          />
          <div className="cart_couponWrap">
            <p className="total_discount">
              상품 할인에 배송비는 포함 되지 않습니다.
            </p>
          </div>
        </>
      ) : null}
      <div className="result">
        <button className="btn_buy" style={{ height: 80 }}>
          구매하기
        </button>
      </div>
    </>
  );
};

export default Cart;
