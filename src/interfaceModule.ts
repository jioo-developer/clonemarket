interface productType {
  id: number;
  name: string;
  provider: string;
  price: number;
  image: string;
  quantity: number;
  quick: boolean;
}

interface homeProps {
  convertPrice: (price: number) => string;
  products: productType[];
}

interface detailProps extends homeProps {
  cart: productType[];
  cartConnect: (params: productType[]) => void;
}
