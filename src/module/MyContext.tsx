// MyContext.ts
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import reducer, { initialState } from "./reducer.ts";
import { Action, cartSelect } from "../interfaceModule";
import convertPrice from "./convertPrice.ts";

type MyContextProps = {
  navigate: (params: string, state?: any) => void;
  dispatch: React.Dispatch<Action>;
  cartData: cartSelect;
  price: (params: number) => string;
};

const MyContext = createContext<MyContextProps>({
  navigate: () => {},
  dispatch: () => {},
  cartData: initialState,
  price: () => "",
});

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [cartData, dispatch] = useReducer(reducer, initialState);

  const price = useCallback((value) => {
    return convertPrice(value);
  }, []);

  return (
    <MyContext.Provider value={{ navigate, dispatch, cartData, price }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): MyContextProps => {
  return useContext(MyContext);
};
