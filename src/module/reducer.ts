import { Action, cartSelect, productType } from "../interfaceModule";

export const initialState: cartSelect = {
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

export default function reducer(
  state = initialState,
  action: Action
): cartSelect {
  switch (action.type) {
    case addCart:
      const result = Array.isArray(action.data)
        ? [...state.cart, ...action.data]
        : [...state.cart, action.data];
      const addset = result.filter((value, idx, arr) => {
        // value = 각각의 값 , idx = 순서 arr = 순회대상
        return (
          arr.findIndex((item) => {
            return (
              item.id === value.id &&
              item.name === value.name &&
              item.price === value.price
            );
          }) === idx
          //비교할 대상 item과 value를 뱌교
        );
      });
      return {
        ...state,
        cart: addset,
      };
    case quantity:
      const quArr = [...state.cart, ...action.data];
      const quantitySet = quArr.filter((value, idx, arr) => {
        // value = 각각의 값 , idx = 순서 arr = 순회대상
        return (
          arr.findIndex((item) => {
            return (
              item.id === value.id &&
              item.name === value.name &&
              item.price === value.price
            );
          }) === idx
          //비교할 대상 item과 value를 뱌교
        );
      });
      return {
        ...state,
        cart: quantitySet,
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
