import React, { useEffect, useState } from "react";
import { productType } from "../interfaceModule";
import ProductComponent from "../module/ProductComponent.tsx";
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
    <div className="recommend-wrap recently-wrap pdb30">
      <p>추천 상품</p>
      <div className="recommend-inWrap">
        <ProductComponent dataArr={recommend} />
      </div>
    </div>
  );
};

export default Recommend;
