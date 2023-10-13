import { createContext, useState, ReactNode } from "react";
import { Order } from "../interfaces";

interface MercadoPagoContextProps {
  preferenceId: string;
  setPreferenceId: React.Dispatch<React.SetStateAction<string>>;
  orderData?: Order;
  setOrderData: React.Dispatch<React.SetStateAction<Order | undefined>>;
}

const MercadoPagoContext = createContext<MercadoPagoContextProps | undefined>(
  undefined
);

const MercadoPagoProvider = ({ children }: { children: ReactNode }) => {
  const [preferenceId, setPreferenceId] = useState<string>("");
  const [orderData, setOrderData] = useState<Order | undefined>(undefined);

  const contextValue: MercadoPagoContextProps = {
    preferenceId,
    setPreferenceId,
    orderData,
    setOrderData,
  };

  return (
    <MercadoPagoContext.Provider value={contextValue}>
      {children}
    </MercadoPagoContext.Provider>
  );
};

export default MercadoPagoProvider;
export { MercadoPagoContext };
