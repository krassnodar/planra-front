import { createContext, useContext } from "react";
import { RootStore } from "./RootStore";

let rootStore: RootStore;

export function initState() {
  if (!rootStore) {
    const start = Date.now();
    rootStore = new RootStore();
    const end = Date.now();
    console.log("TIME TO CREATE ROOT STORE:  ", (end - start) / 1000);
    return rootStore;
  }

  return rootStore;
}

const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider = RootStoreContext.Provider;
export const useStores = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    console.log("[ERROR]: useStores must be used within a RootStoreProvider ");
    throw new Error("useStores must be used within a RootStoreProvider");
  }
  return context;
};
