type initialStateType = {
  cart: productType[];
};

const initialState: initialStateType = {
  cart: [],
};

const addCart = "addCart";
const quantity = "quantity";
const remove = "remove";

export const cartAdd = (data: productType | productType[]) => ({
  type: addCart,
  data,
});

export const calculator = (data: productType[]) => ({
  type: quantity,
  data,
});

export const removeItem = (data: productType[]) => ({
  type: remove,
  data,
});

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case addCart:
      return {
        ...state,
        cart: Array.isArray(action.data)
          ? [...state.cart, ...action.data]
          : [...state.cart, action.data],
      };
    case quantity:
      return {
        ...state,
        cart: action.data,
      };
    case remove:
      return {
        ...state,
        cart: action.data,
      };
    default:
      return state;
  }
}
