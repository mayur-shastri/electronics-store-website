import { createContext, useContext } from "react";
import useStore from "../../store/products";
import useAuth from "../../store/auth";
import useOrders from "../../store/orders";

const globalContext = createContext();

export const useGlobalContext = () => useContext(globalContext);

const GlobalContext = ({ children }) => {
  const store = useStore();
  const auth = useAuth();
  const orders = useOrders();
  return (
    <globalContext.Provider value={{ store, auth, orders }}>
      {children}
    </globalContext.Provider>
  );
};
export default GlobalContext;
