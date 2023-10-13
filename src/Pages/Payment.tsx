import { useContext, useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { MercadoPagoContext } from "../Contexts/mercadoPagoContext";

const PaymentPage = () => {
  const mercadoPagoContext = useContext(MercadoPagoContext);
  if (!mercadoPagoContext) {
    return null;
  }

  const { orderData, preferenceId } = mercadoPagoContext;

  const [isReady, setIsReady] = useState(false);

  const handleOnReady = () => {
    setIsReady(true);
  };

  const renderCheckoutButton = (preferenceId: string) => {
    if (!preferenceId) return null;

    return (
      <Wallet
        initialization={{ preferenceId: preferenceId }}
        onReady={handleOnReady}
      />
    );
  };
  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_APP_MERCADO_PAGO_PUBLIC_KEY, {
      locale: "pt-BR",
    });
  }, []);

  return (
    // <div id={import.meta.env.VITE_APP_ID_MP}>
    //   <Wallet
    //     initialization={{
    //       preferenceId: import.meta.env.VITE_APP_ID_MP,
    //       redirectMode: "blank",
    //     }}
    //   />
    // </div>
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold">Checkout Payment</h2>
        <p className="text-gray-600">
          This is an example of a Mercado Pago integration
        </p>
        <div className="mt-6">
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Summary</h2>
            <div className="mt-2">
              <p className="text-gray-700">
                Price:{" "}
                <span className="font-semibold">${orderData?.subTotal}</span>
              </p>
              <p className="text-gray-700">
                Book X{" "}
                <span className="font-semibold">{orderData?.isPaid}</span>
              </p>
            </div>
            <div className="mt-4">
              <p className="text-xl font-semibold">
                Total:{" "}
                <span className="font-semibold">${orderData?.status}</span>
              </p>
            </div>
          </div>
          <div className="mt-6">{renderCheckoutButton(preferenceId)}</div>
        </div>
      </div>
    </div>
  );
};
export default PaymentPage;
