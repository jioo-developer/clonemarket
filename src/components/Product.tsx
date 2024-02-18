import React from "react";
import { useNavigate } from "react-router-dom";
const Product = ({ products, convertPrice }: homeProps) => {
  const navigate = useNavigate();
  function detailDirect(id: number) {
    navigate(`/product/${id}`, { state: { id: id } });
  }
  return (
    <main className="flex_wrap">
      {products.length
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
