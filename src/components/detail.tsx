import React, { useEffect, useState } from "react";
import convertPrice from "../module/convertPrice.ts";
import { useMyContext } from "../module/MyContext.tsx";
import { calculator, cartAdd } from "../module/reducer.ts";
import { useSelector } from "react-redux";
import Recommend from "./recommend.tsx";
import { productType } from "../interfaceModule";
import { cartSelect } from "../interfaceModule";
import { useParams } from "react-router-dom";

const Detail = ({ products }: { products: productType[] }) => {
  const { dispatch, navigate } = useMyContext();
  const [count, setCount] = useState(1);
  const cart = useSelector((state: cartSelect) => state.cart);
  const pageId = useParams().id;
  const initialData: productType = {
    id: 0,
    name: "",
    provider: "",
    price: 0,
    image: "",
    quantity: 0,
    quick: false,
    class: "",
  };
  const [items, setItem] = useState<productType>(initialData);

  useEffect(() => {
    if (products.length > 0 && pageId) {
      const data = products.filter((item) => item.id === parseInt(pageId))[0];
      if (data) {
        setItem(data);
      } else {
        navigate("/");
      }
    }
  }, [products, pageId]);

  useEffect(() => {
    if (items.name !== "") {
      const loadRecently = localStorage.getItem("recently");
      const parseRecently: string[] = JSON.parse(loadRecently || "{}");
      if (!loadRecently) {
        localStorage.setItem("recently", JSON.stringify([items.name]));
      } else {
        const newRecently: string[] = [...parseRecently, items.name];
        localStorage.setItem("recently", JSON.stringify(newRecently));
      }
    }
  }, [items]);

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
    //상품 객체를 받음
    const idx = cart.indexOf(overlapProduct);
    // 카트에서 상품객체의 위치를 찾음
    const newNum = { ...overlapProduct };
    // 상품 객체를 복사 한 후
    newNum.quantity = newNum.quantity + count;
    const splice = cart.splice(idx, 1, newNum);
    // 복사한 상품 객체의 갯수를 증가 시킴
    dispatch(calculator(splice));
  };

  const cartFunc = () => {
    const num = { ...items };
    num.quantity = num.quantity + count;
    dispatch(cartAdd(num));
  };

  const handleCart = (id: number) => {
    if (items.name !== "" && !isNaN(count)) {
      //items에 item이 있을 때
      if (cart.length === 0) {
        cartFunc();
        //카트에 item이 없을 때
      } else {
        const found = cart.filter((item) => item.id === id);
        // 카트에 이미 그 상품이 있을 때
        if (found.length > 0) {
          setQuantity(found[0]);
          // 상품 객체를 넘김
        } else {
          cartFunc();
          // 카트에 그 상품은 없지만 다른 상품은 있을 때
        }
      }
    }
  };

  return (
    <>
      {items ? (
        <main className="main">
          <section className="in_product">
            <div className="product_img">
              <img src={items.image} alt="product" />
            </div>
          </section>
          <section className="in_product">
            <div className="product_info">
              <p className="seller_store">{items.provider}</p>
              <p className="product_name">{items.name}</p>
              <span className="price">
                {convertPrice(items.price)}
                <span className="unit">원</span>
              </span>
            </div>

            <div className="delivery">
              <p
                style={
                  items.quick
                    ? { color: "cadetblue", fontWeight: 600 }
                    : { color: "rgb(185 185 185)" }
                }
              >
                택배배송 /
              </p>
              <p
                style={
                  !items.quick
                    ? { color: "cadetblue", fontWeight: 600 }
                    : { color: "rgb(185 185 185)" }
                }
              >
                &nbsp;빠른배송
              </p>
            </div>

            <div className="line"></div>

            <div className="amount">
              <button onClick={() => handleQuantity("minus")}>
                <img
                  className="minus"
                  src="/images/icon-minus-line.svg"
                  alt="minus"
                />
              </button>
              <div className="count">
                <input
                  type="number"
                  step="0.01"
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  defaultValue={count}
                  value={count}
                />
              </div>
              <button onClick={() => handleQuantity("plus")}>
                <img
                  className="plus"
                  src="/images/icon-plus-line.svg"
                  alt="plus"
                />
              </button>
            </div>

            <div className="line"></div>

            <div className="sum">
              <div>
                <span className="sum_price">총 상품 금액</span>
              </div>

              <div className="total_info">
                <span className="total">
                  총 수량{" "}
                  <span className="total_count">
                    {isNaN(count) ? "" : count}개
                  </span>
                </span>
                <span className="total_price">
                  {isNaN(parseInt(convertPrice(items.price * count)))
                    ? ""
                    : convertPrice(items.price * count)}
                  <span className="total_unit">원</span>
                </span>
              </div>
            </div>

            <div className="btns">
              <button
                className="btn_buy"
                onClick={() => {
                  handleCart(items.id);
                }}
              >
                장바구니
              </button>
            </div>
          </section>
        </main>
      ) : (
        "상품을 준비중입니다"
      )}
      <Recommend products={products} type={items} />
    </>
  );
};

export default Detail;
