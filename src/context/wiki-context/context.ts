import React from "react";
import { createContext } from "react";
import initialState from "./initialState";
import { WikiState } from "./types";

const WikiContext = createContext<{
  state: WikiState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export default WikiContext;
