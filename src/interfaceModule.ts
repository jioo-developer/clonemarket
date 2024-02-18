type productType = {
  id: number;
  name: string;
  provider: string;
  price: number;
  image: string;
  quantity: number;
};

type homeProps = {
  convertPrice: (price: number) => string;
  products: productType[];
};
