import { useContext, useEffect, useMemo, useState } from 'react';
import useCartModal from '../../hooks/useCartModal';
import { api } from '../../api';
import Modal from './Modal';
import {
  Address,
  AvaliableAppointment,
  Cart,
  CartToProduct,
} from '../../interfaces';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';
import useAddToCartModal from '../../hooks/useAddToCartModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SelectAppointment from '../SelectAppointment';
import SelectAddress from '../Address/SelectAddress';
import Button from '../Button';
import MapAddress from '../Address/Map';
import { CalendarIcon, Car } from 'lucide-react';
import { RestaurantContext } from '../../Contexts/restaurantContext';
import useRegisterModal from '../../hooks/useRegisterModal';
import { UserContext } from '../../Contexts/currentUser';
import { MercadoPagoContext } from '../../Contexts/mercadoPagoContext';

enum STEPS {
  PRODUCTS = 0,
  CHOOSE = 1,
  APPOINTMENT = 2,
  DELIVERY = 3,
  PAYMENT = 4,
}

const CartModal = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const user = userContext ? userContext.user : null;
  const { isRestaurantOpen } = useContext(RestaurantContext)!;
  const cartModal = useCartModal();
  const addCartModal = useAddToCartModal();
  const registerModal = useRegisterModal();

  const [step, setStep] = useState(STEPS.PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<Cart>();
  const [appointmentId, setAppointmentId] = useState('');
  const [appointment, setAppointment] = useState<AvaliableAppointment | null>(
    null
  );
  const [addressId, setAddressId] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [showUserAdresses, setShowSelectAddress] = useState(true);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const [serachParams] = useSearchParams();

  const toggleSelectAddress = () => {
    setShowSelectAddress(!showUserAdresses);
  };

  useEffect(() => {
    if (serachParams.get('success')) {
      toast.success('Pagamento efetuado com sucesso.');
    }
    if (serachParams.get('canceled')) {
      toast.error('Algo deu errado, tente novamente.');
    }
  }, [serachParams]);

  useEffect(() => {
    if (cartModal.isOpen === true) {
      document.body.style.overflow = 'hidden';
    }
    if (cartModal.isOpen === false) {
      document.body.style.overflow = 'auto';
    }
  }, [cartModal.isOpen]);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await api.get('/cart');
      setCart(response.data);
    };
    fetchCart();
  }, [cartModal.cartItems, addCartModal.isOpen]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PAYMENT && user && user.role === 'guest') {
      return 'Crie uma conta';
    }
    if (step === STEPS.PAYMENT) {
      return 'Escolher forma de pagamento';
    }

    return 'Próximo';
  }, [step, user]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PRODUCTS) {
      return undefined;
    }

    return 'Voltar';
  }, [step]);

  const mercadoPagoContext = useContext(MercadoPagoContext);
  if (!mercadoPagoContext) {
    return null;
  }
  const { setOrderData, setPreferenceId } = mercadoPagoContext;

  const onBack = () => {
    if (step === STEPS.DELIVERY) {
      return setStep((value) => value - 2);
    }
    setStep((value) => value - 1);
  };

  const onNext = () => {
    if (step === STEPS.APPOINTMENT) {
      return setStep((value) => value + 2);
    }
    if (step === STEPS.DELIVERY && !isRestaurantOpen) {
      toast.error('Restaurante está fechado');
      return;
    }
    setStep((value) => value + 1);
  };

  const handleAddressId = (addressId: string, selectedAddress?: Address) => {
    setAddressId(addressId);
    setAddress(selectedAddress as Address);
  };

  const handleAvailiableAppointmentId = (
    avaliableAppointmentId: string,
    appointment?: AvaliableAppointment
  ) => {
    setAppointmentId(avaliableAppointmentId);
    setAppointment(appointment as AvaliableAppointment);
  };

  const handleIsSelectOpen = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const onSubmit = async () => {
    try {
      if (step !== STEPS.PAYMENT) {
        return onNext();
      }
      if (step === STEPS.PAYMENT && user && user.role === 'guest') {
        cartModal.onClose();
        registerModal.onOpen();
        return;
      }

      setIsLoading(true);
      // const response = await api.post("/testCheckout", {
      const response = await api.post('/testMercadoPago', {
        avaliableAppointmentId: appointmentId,
        addressId: addressId,
      });
      console.log(response.data);
      setPreferenceId(response.data.data.id);
      setOrderData(response.data.actualOrder);
      toast.success('Pedido enviado');
      cartModal.onClose();
      navigate('/checkout');
    } catch (err) {
      console.log(err);
      toast.error('Algo deu errado');
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (ctp: CartToProduct) => {
    try {
      setIsLoading(true);
      await api.delete('/removeProduct', {
        data: {
          productId: ctp.productId,
          cartProductId: ctp.id,
        },
      });
      toast.success('product deleted successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (cart) {
    cartModal.cartItems = cart.cartProducts;
  }

  let bodyContent = (
    <div>
      {cart?.cartProducts.map((cartProduct) => (
        <div
          key={cartProduct.id}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex flex-col items-start justify-between">
            <div className="flex gap-x-2">
              <p>{cartProduct.quantity}x</p>
              <p className="font-semibold text-lg">
                {cartProduct.product.name}
              </p>
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
    </div>
  );

  if (step === STEPS.CHOOSE) {
    bodyContent = (
      <div className="flex justify-around gap-1">
        <div
          data-cy="calendar"
          className="flex flex-col items-center bg-slate-200 rounded-xl p-5 hover:cursor-pointer w-1/2"
          onClick={() => setStep((value) => value + 1)}
        >
          <CalendarIcon size={50} />
          <p className="text-lg font-semibold">Busque no restaurante</p>
        </div>
        <div
          data-cy="address"
          className="flex flex-col items-center bg-slate-200 rounded-xl p-5 hover:cursor-pointer w-1/2"
          onClick={() => setStep((value) => value + 2)}
        >
          <Car size={50} />
          <p className="text-lg font-semibold">Delivery grátis ate 2km</p>
        </div>
      </div>
    );
  }

  if (step === STEPS.APPOINTMENT) {
    bodyContent = (
      <div className="flex flex-col  gap-3">
        <h1 className="text-2xl ">Selecione um horário para buscar</h1>
        <SelectAppointment
          handleAvailiableAppointmentId={handleAvailiableAppointmentId}
        />
      </div>
    );
  }

  if (step === STEPS.DELIVERY) {
    bodyContent = (
      <div className="flex flex-col  gap-3">
        {showUserAdresses && user?.addresses ? (
          <>
            <SelectAddress
              user={user}
              handleIsSelectOpen={handleIsSelectOpen}
              handleAddressId={handleAddressId}
            />
            <Button
              label="Crie um endereço"
              onClick={toggleSelectAddress}
              outline
              small
              disabled={isSelectOpen || !isRestaurantOpen}
            />
          </>
        ) : (
          <div className="flex flex-col gap-3 ">
            <MapAddress handleAddressId={handleAddressId} />
            <Button
              label="Selecione um endereço salvo"
              onClick={toggleSelectAddress}
              outline
              small
              disabled={!isRestaurantOpen}
            />
          </div>
        )}
      </div>
    );
  }

  if (step === STEPS.PAYMENT) {
    bodyContent = (
      <div className="flex flex-col ">
        {cart?.cartProducts.map((cartProduct) => (
          <div
            key={cartProduct.id}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex flex-col items-start justify-between">
              <div className="flex gap-x-2">
                <p>{cartProduct.quantity}x</p>
                <p className="font-semibold text-lg">
                  {cartProduct.product.name}
                </p>
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
              <h1 className="text-xl font-semibold mb-2">
                Endereço de entrega:
              </h1>
              <p className="text-sm">
                {address.street}, {address.streetNumber} - apto
                {address.complementNumber} - {address.neighborhood},{' '}
                {address.CEP}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Modal
        title="Carrinho"
        actionLabel={
          isLoading && step === STEPS.PAYMENT
            ? 'Enviando pedido...'
            : actionLabel
        }
        body={bodyContent}
        onClose={cartModal.onClose}
        disabled={isLoading || isSelectOpen}
        onSubmit={onSubmit}
        isOpen={cartModal.isOpen}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.PRODUCTS ? undefined : onBack}
      />
    </div>
  );
};

export default CartModal;
