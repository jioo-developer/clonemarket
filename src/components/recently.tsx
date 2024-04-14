import React from "react";
import ProductComponent from "../module/ProductComponent.tsx";
import { productType } from "../interfaceModule";

const Recently = ({ recently }: { recently: productType[] }) => {
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
        <ProductComponent dataArr={recently} />
      </div>
    </div>
  );
};

export default React.memo(Recently);
