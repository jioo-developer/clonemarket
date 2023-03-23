import React from "react";
const Product = ({ products, convertPrice }) => {
  // <Link to={`/product/${product.id}`}></Link>
  return (
    <main className="flex_wrap">
      {products.length
        ? products.map((product) => {
            return (
              <div className="product" key={product.id}>
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
                  <span className="price">
                    {/* {convertPrice(product.price)} */}
                    {product.price}
                  </span>
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
