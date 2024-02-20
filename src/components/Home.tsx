import React, { useEffect, useState } from "react";
import convertPrice from "../module/convertPrice.ts";
import { useMyContext } from "../module/MyContext.tsx";
import { productType } from "../interfaceModule";
import Recently from "../components/recently.tsx";
type homeProps = {
  products: productType[];
};

const Product = ({ products }: homeProps) => {
  const [recently, setRecently] = useState<productType[]>([]);
  const { navigate } = useMyContext();
  function detailDirect(id: number) {
    navigate(`/product/${id}`);
  }
  const loadData = localStorage.getItem("recently");

  useEffect(() => {
    if (loadData) {
      const parseData: string[] = JSON.parse(loadData);
      const resultData = parseData
        .map((item) => products.filter((el) => el.name === item))
        .flat();
      const set = new Set(resultData);
      const res = Array.from(set);
      setRecently(res);
    }
  }, [loadData, products]);
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
                    <span className="price">{convertPrice(product.price)}</span>
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
