import { createContext } from "react";
import Store, { store } from "../store/store";

interface State {
  store: Store;
}

export const StoreContext = createContext<State>({
  store,
});
