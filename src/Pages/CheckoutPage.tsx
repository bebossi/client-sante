import { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const CheckoutPage = () => {
  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_APP_MERCADO_PAGO_PUBLIC_KEY, {
      locale: "pt-BR",
    });
  }, []);
  return (
    <div>
      <Wallet
        initialization={{
          preferenceId: import.meta.env.VITE_APP_ID_MP,
          redirectMode: "blank",
        }}
      />
    </div>
  );
};

export default CheckoutPage;
