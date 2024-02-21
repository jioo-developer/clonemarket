import React, { useEffect, useState } from "react";
import convertPrice from "../module/convertPrice.ts";
import { productType } from "../interfaceModule";
import { useMyContext } from "../module/MyContext.tsx";

type recentlyProps = {
  recently: productType[];
};

const Recently = ({ recently }: recentlyProps) => {
  const { navigate } = useMyContext();
  function detailDirect(id: number) {
    navigate(`/product/${id}`);
  }
  return (
    <div className="recently-wrap">
      {recently.length > 0 ? <p>최근 본 상품</p> : null}
      <div
        className="recently-inWrap"
        style={
          recently.length > 5
            ? { gridTemplateColumns: `repeat(${recently.length},1fr)` }
            : { gridTemplateColumns: `repeat(${5},1fr)` }
        }
      >
        {recently.length > 0
          ? recently.map((product) => {
              return (
                <div
                  className="product"
                  key={product.id}
                  onClick={() => detailDirect(product.id)}
                >
                  <div className="product_image">
                    <img src={product.image} alt="product" />
                  </div>
                  <div className="store">
                    <span>{product.provider}</span>
                  </div>

                  <div className="product_name">
                    <span>{product.name}</span>
                  </div>

                  <div className="product_price">
                    <span className="price">{convertPrice(product.price)}</span>
                    <span className="unit">원</span>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Recently;
