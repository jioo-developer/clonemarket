import React, { useEffect, useState } from "react";
import { productType } from "../interfaceModule";
import { Link } from "react-router-dom";
import { useMyContext } from "../module/MyContext.tsx";
type RecommendProps = {
  products: productType[];
  type: productType;
};

const Recommend = ({ products, type }: RecommendProps) => {
  const { price } = useMyContext();
  const [recommend, setRecommend] = useState<productType[]>([]);
  useEffect(() => {
    if (products.length > 0) {
      const typeFilter = products.filter((item) => item.class === type.class);
      const result = typeFilter.filter((item) => item !== type);
      setRecommend(result);
    }
  }, [products, type]);

  return (
    <div className="recommend-wrap recently-wrap pdb30">
      <p>추천 상품</p>
      <div className="recommend-inWrap">
        {recommend.length > 0
          ? recommend.map((product, index) => {
              return (
                <Link to={`/product/${product.id}`}>
                  <div
                    className="product"
                    key={product.id}
                    style={index !== 0 ? { marginLeft: 20 } : { marginLeft: 0 }}
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
                      <span className="price">{price(product.price)}</span>
                      <span className="unit">원</span>
                    </div>
                  </div>
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Recommend;
