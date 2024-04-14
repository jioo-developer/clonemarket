import React from "react";
import { productType } from "../interfaceModule.ts";
import { useMyContext } from "./MyContext.tsx";
import { detailDirect } from "./exportFunction.ts";
const ProductComponent = ({
  dataArr,
  index,
}: {
  dataArr: productType[];
  index?: number;
}) => {
  const { price, navigate } = useMyContext();
  return dataArr.length > 0
    ? dataArr.map((item) => {
        return (
          <div
            className="product"
            key={item.id}
            onClick={() => detailDirect(navigate, item.id)}
          >
            <div className="product_image">
              <img src={item.image} alt="product" />
            </div>
            <div className="store">
              <span>{item.provider}</span>
            </div>

            <div className="product_name">
              <span>{item.name}</span>
            </div>

            <div className="product_price">
              <span className="price">{price(item.price)}</span>
              <span className="unit">원</span>
            </div>
          </div>
        );
      })
    : null;
};

export default ProductComponent;
