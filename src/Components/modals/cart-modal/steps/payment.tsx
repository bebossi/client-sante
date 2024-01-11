import { IoMdClose } from 'react-icons/io';
import {
  Address,
  AvaliableAppointment,
  Cart,
  CartToProduct,
} from '../../../../interfaces';

interface PaymentProps {
  cart: Cart | undefined;
  removeProduct: (ctp: CartToProduct) => Promise<void>;
  appointment: AvaliableAppointment | null;
  address: Address | null;
}
export const Payment: React.FC<PaymentProps> = ({
  cart,
  removeProduct,
  appointment,
  address,
}) => {
  return (
    <div className="flex flex-col ">
      {cart?.cartProducts.map((cartProduct) => (
        <div key={cartProduct.id} className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-start justify-between">
            <div className="flex gap-x-2">
              <p>{cartProduct.quantity}x</p>
              <p className="font-semibold text-lg">{cartProduct.product.name}</p>
            </div>
            {cartProduct.cartToProductToppings.map((ctpt) => (
              <div key={ctpt.id} className="flex text-gray-500 gap-x-3">
                {ctpt.quantity > 0 && (
                  <>
                    <p>{ctpt.quantity / cartProduct.quantity}x</p>
                    <p className="">{ctpt.topping.name}</p>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex">
            <img
              src={cartProduct.product.image}
              className="w-20 h-20 rounded-lg shadow-lg"
            />
            <IoMdClose
              className="ml-2 hover:cursor-pointer"
              size={12}
              onClick={() => removeProduct(cartProduct)}
            />
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between  ">
        <p className="font-semibold">Subtotal: </p>
        <p className="font-semibold"> R${cart?.subtotal}</p>
      </div>
      <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md">
        {appointment && (
          <div className="mb-4">
            <h1 className="text-xl font-semibold mb-2">Retirada as:</h1>
            <p className="text-sm">
              {new Date(appointment.startDate).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </p>
          </div>
        )}
        {address && (
          <div data-cy="deliveryAddress">
            <h1 className="text-xl font-semibold mb-2">Endereço de entrega:</h1>
            <p className="text-sm">
              {address.street}, {address.streetNumber} - apto
              {address.complementNumber} - {address.neighborhood}, {address.CEP}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
