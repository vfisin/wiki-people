import React from "react";
import { useReducer } from "react";
import wikiReducer from "../reducers/reducer";
import initialState from "./initialState";
import WikiContext from "./context";

type Props = {
  children: React.ReactNode;
};

export function WikiDataProvider({ children }: Props) {
  const [state, dispatch] = useReducer(wikiReducer, initialState);

  return (
    <WikiContext.Provider value={{ state, dispatch }}>
      {children}
    </WikiContext.Provider>
  );
}
