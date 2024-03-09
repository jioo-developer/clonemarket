import React, { useEffect, useState } from "react";
import { useMyContext } from "../module/MyContext.tsx";
import { productType } from "../interfaceModule";
import Recently from "../components/recently.tsx";
type homeProps = {
  products: productType[];
};

const Product = ({ products }: homeProps) => {
  const [recently, setRecently] = useState<productType[]>([]);
  const loadData = localStorage.getItem("recently");
  const parseData: string[] | [] = JSON.parse(loadData || "[]");
  const { navigate, price } = useMyContext();
  function detailDirect(id: number) {
    navigate(`/product/${id}`);
  }

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
                    <span className="price">{price(product.price)}</span>
                    <span className="unit">원</span>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </main>
  );
};

export default Product;
