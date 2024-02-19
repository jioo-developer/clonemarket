export interface productType {
  id: number;
  name: string;
  provider: string;
  price: number;
  image: string;
  quantity: number;
  quick: boolean;
  class: string;
}

export interface cartSelect {
  cart: productType[];
}
