import { useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../../../api';
import Modal from '../Modal';
import { Address, AvaliableAppointment, Cart, CartToProduct } from '../../../interfaces';
import toast from 'react-hot-toast';
import { useAddToCartModal, useCartModal, useRegisterModal } from '../../../hooks/index';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RestaurantContext, UserContext, MercadoPagoContext } from '../../../Contexts';
import { useLockBody } from '../../../hooks/useLockBoody';
import { STEPS } from '../../../lib/contants';
import { Choose, Appointment, Delivery, Payment, Products } from './steps';

export const CartModal = () => {
  useLockBody();
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
  const [appointment, setAppointment] = useState<AvaliableAppointment | null>(null);

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
      const response = await api.post('/testMercadoPago', {
        avaliableAppointmentId: appointmentId,
        addressId: addressId,
      });
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

  let bodyContent = cart && <Products cart={cart} setIsLoading={setIsLoading} />;

  if (step === STEPS.CHOOSE) {
    bodyContent = <Choose setStep={setStep} />;
  }

  if (step === STEPS.APPOINTMENT) {
    bodyContent = (
      <Appointment handleAvailiableAppointmentId={handleAvailiableAppointmentId} />
    );
  }

  if (step === STEPS.DELIVERY) {
    bodyContent = (
      <Delivery
        user={user}
        showUserAdresses={showUserAdresses}
        handleAddressId={handleAddressId}
        handleIsSelectOpen={handleIsSelectOpen}
        isRestaurantOpen={isRestaurantOpen}
        isSelectOpen={isSelectOpen}
        toggleSelectAddress={toggleSelectAddress}
      />
    );
  }

  if (step === STEPS.PAYMENT) {
    bodyContent = (
      <Payment
        address={address}
        appointment={appointment}
        cart={cart}
        removeProduct={removeProduct}
      />
    );
  }
  return (
    <div>
      <Modal
        title="Carrinho"
        actionLabel={
          isLoading && step === STEPS.PAYMENT ? 'Enviando pedido...' : actionLabel
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
