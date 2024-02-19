interface productType {
  id: number;
  name: string;
  provider: string;
  price: number;
  image: string;
  quantity: number;
  quick: boolean;
  class: string;
}

interface homeProps {
  products: productType[];
}

type cartSelect = {
  cart: productType[];
};
