import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [productItem, setProduct] = useState();
  const [count, setCount] = useState();
  const [convertNum, setConvertNum] = useState("");

  useEffect(() => {
    axios.get("/data/products.json").then((data) => {
      const result = data.data.products.find((item) => {
        return item.id === parseInt(id);
      });
      setConvertNum(result.price);
      setProduct(result);
      console.log(result);
    });
  }, [id]);

  return (
    productItem && (
      <>
        <main className="main">
          <section className="in_product">
            <div className="product_img">
              <img src={productItem.image} alt="product" />
            </div>
          </section>
          <section className="in_product">
            <div className="product_info">
              <p className="seller_store">{productItem.provider}</p>
              <p className="product_name">{productItem.name}</p>
              <span className="price">
                {/* {converNum} */}
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
              />

              <div className="count">
                <span>{count}</span>
              </div>

              <img
                className="plus"
                src="/images/icon-plus-line.svg"
                alt="plus"
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
                  {/* {convertPrice(productItem.price * count)} */}
                  <span className="total_unit">원</span>
                </span>
              </div>
            </div>

            <div className="btns">
              <button className="btn_buy">바로 구매</button>
              <button className="btn_cart">장바구니</button>
            </div>
          </section>
        </main>
      </>
    )
  );
};

export default Detail;
