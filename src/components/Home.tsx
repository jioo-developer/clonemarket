import React, { useEffect, useState } from "react";
import { productType } from "../interfaceModule";
import Recently from "../components/recently.tsx";
import ProductComponent from "../module/ProductComponent.tsx";
type homeProps = {
  products: productType[];
};

const Product = ({ products }: homeProps) => {
  const [recently, setRecently] = useState<productType[]>([]);
  const loadData = localStorage.getItem("recently");
  const parseData: string[] | [] = JSON.parse(loadData || "[]");

  useEffect(() => {
    if (products.length > 0 && parseData.length > 0) {
      const resultData = parseData
        .map((item) => products.filter((el) => el.name === item))
        .flat();
      const res = resultData.filter((value, idx, arr) => {
        // value = 각각의 값 , idx = 순서 arr = 순회대상
        return (
          arr.findIndex((item) => {
            return item.name === value.name;
          }) === idx
        );
      });
      setRecently(res);
    }
  }, [products]);

  return (
    <main className="flex_wrap">
      <Recently recently={recently} />
      <div>
        <ProductComponent dataArr={products} />
      </div>
    </main>
  );
};

export default Product;
