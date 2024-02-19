import React from "react";
import convertPrice from "../module/convertPrice.ts";
import { useMyContext } from "../module/MyContext.tsx";

const Product = ({ products }: homeProps) => {
  const { navigate } = useMyContext();
  function detailDirect(id: number) {
    navigate(`/product/${id}`, { state: { id: id } });
  }
  return (
    <main className="flex_wrap">
      {products.length > 0
        ? products.map((product) => {
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
    </main>
  );
};

export default Product;
