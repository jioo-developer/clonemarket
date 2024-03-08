import React, { ChangeEvent, useCallback } from "react";
import { useEffect, useState } from "react";
import CartHeader from "./cart/CartHeader.tsx";
import CartList from "./cart/CartList.tsx";
import TotalCart from "./cart/TotalCart.tsx";
import CartCoupon from "./cart/CartCoupon.tsx";
import { useMyContext } from "../module/MyContext.tsx";
import { calculator, removeItem } from "../module/reducer.ts";
import { productType } from "../interfaceModule";
import CartBill from "./cart/CartBill.tsx";
const Cart = () => {
  const [total, setTotal] = useState<number>(0);
  const [checkLists, setCheckLists] = useState<number[]>([]);
  const [bill, setBill] = useState<boolean>(false);
  const [randomNum, setRandom] = useState(0);
  const { cartData, dispatch } = useMyContext();
  const cart = cartData.cart;

  const handleQuantity = (id: number, quantity: number) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const newNum = found;
    newNum.quantity = quantity;
    const splice = cart.splice(idx, 1, newNum);
    dispatch(calculator(splice));
  };

  const handleRemove = (productId: number) => {
    dispatch(removeItem(cart.filter((cart) => cart.id !== productId)));
  };

  const handlerCheckList = (checked: boolean, productId: number) => {
    if (checked) {
      setCheckLists([...checkLists, productId]);
    } else {
      const result = checkLists.filter((item) => item !== productId);
      setCheckLists(result);
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
    } else {
      alert("이미 발급된 쿠폰이 있습니다.");
    }
  };

  const totalConnect = (value: number) => {
    setTotal(value);
  };

  const billConnect = (value: boolean) => {
    setBill(value);
  };

  const quantityConnect = (target: number, value: number) => {
    handleQuantity(target, value);
  };

  const buyitem = useCallback(() => {
    if (cart.length > 0) {
      return checkLists
        .map((item) => cart.filter((el) => el.id === item))
        .flat();
    } else {
      return [];
    }
  }, [cart, checkLists]);

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

  useEffect(() => {
    if (cart.length > 0) {
      const array: number[] = [];
      cart.forEach((item) => array.push(item.id));
      setCheckLists(array);
    }
  }, [cart]);

  useEffect(() => {
    buyitem();
  }, [checkLists, buyitem]);

  return (
    <>
      <CartHeader AllChecked={AllChecked} isAllChecked={isAllChecked} />
      {cart.length > 0 ? (
        cart.map((item: productType) => {
          return (
            <CartList
              quantityConnect={quantityConnect}
              key={item.id}
              item={item}
              count={item.quantity}
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
            randomNum={randomNum}
            buyitem={buyitem}
            checkLists={checkLists}
          />
        </>
      ) : null}
      <div className="result">
        <button
          className="btn_buy"
          style={
            cart.length === 0 || total === 0
              ? { background: "#767676", height: 80 }
              : { height: 80 }
          }
          disabled={cart.length === 0 || total === 0}
          onClick={() => setBill(true)}
        >
          구매하기
        </button>
      </div>
      {bill ? (
        <div className="cover">
          <CartBill
            billConnect={billConnect}
            random={randomNum}
            total={total}
          />
        </div>
      ) : null}
    </>
  );
};

export default Cart;
