"use client";

import { useEffect, useState, ReactNode } from "react";
import { Provider } from "react-redux";
import { createStore, AppStore } from "./store";
import { CartState } from "./cartSlice";

interface Props {
  children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cartState");

    let preloadedState: { cart: CartState } | undefined = undefined;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          typeof parsed === "object" &&
          Array.isArray(parsed.items) &&
          typeof parsed.phone === "string"
        ) {
          preloadedState = { cart: parsed };
        }
      } catch {}
    }

    const newStore = createStore(preloadedState);
    setStore(newStore);

    newStore.subscribe(() => {
      localStorage.setItem(
        "cartState",
        JSON.stringify(newStore.getState().cart)
      );
    });
  }, []);

  if (!store) return null;

  return <Provider store={store}>{children}</Provider>;
};
