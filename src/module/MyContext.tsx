// MyContext.ts
import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import reducer, { initialState } from "./reducer";
import { Action, cartSelect } from "../interfaceModule";

type MyContextProps = {
  navigate: (params: string, state?: any) => void;
  dispatch: React.Dispatch<Action>;
  cartData: cartSelect;
};

const MyContext = createContext<MyContextProps>({
  navigate: () => {},
  dispatch: () => {},
  cartData: initialState,
});

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [cartData, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={{ navigate, dispatch, cartData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): MyContextProps => {
  return useContext(MyContext);
};
