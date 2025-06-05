import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const createStore = (preloadedState?: {
  cart: ReturnType<typeof cartReducer>;
}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
