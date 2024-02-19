import React, { useEffect, useState } from "react";
import convertPrice from "../module/convertPrice.ts";
import { productType } from "../interfaceModule";
type RecommendProps = {
  products: productType[];
  type: productType;
};

const Recommend = ({ products, type }: RecommendProps) => {
  const [recommend, setRecommend] = useState<productType[]>([]);
  useEffect(() => {
    if (products.length > 0) {
      const typeFilter = products.filter((item) => item.class === type.class);
      const result = typeFilter.filter((item) => item !== type);
      setRecommend(result);
    }
  }, [products, type]);

  return (
    <div className="recommend-wrap">
      <p>추천 상품</p>
      <div className="recommend-inWrap">
        {recommend.length > 0
          ? recommend.map((product) => {
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

export default Recommend;
