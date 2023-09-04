import { useContext, useEffect, useMemo, useState } from "react";
import useCartModal from "../../hooks/useCartModal";
import { api } from "../../api";
import Modal from "./Modal";
import {
  Address,
  AvaliableAppointment,
  Cart,
  CartToProduct,
} from "../../interfaces";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import useAddToCartModal from "../../hooks/useAddToCartModal";
import { useSearchParams } from "react-router-dom";
import SelectAppointment from "../SelectAppointment";
import SelectAddress from "../Address/SelectAddress";
import Button from "../Button";
import MapAddress from "../Address/Map";
import { UserContext } from "../../auth/currentUser";
import { CalendarIcon, Car } from "lucide-react";
import { RestaurantContext } from "../../auth/restaurantContext";

enum STEPS {
  PRODUCTS = 0,
  CHOOSE = 1,
  APPOINTMENT = 2,
  LOCATION = 3,
  PAYMENT = 4,
}

const CartModal = () => {
  const { user } = useContext(UserContext);
  const cartModal = useCartModal();
  const addCartModal = useAddToCartModal();
  const restaurantContext = useContext(RestaurantContext);
  const isOpen = restaurantContext?.isOpen;

  const [step, setStep] = useState(STEPS.PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<Cart>();
  const [appointmentId, setAppointmentId] = useState("");
  const [appointment, setAppointment] = useState<AvaliableAppointment | null>(
    null
  );
  const [addressId, setAddressId] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [showSelectAddress, setShowSelectAddress] = useState(true);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [serachParams] = useSearchParams();

  const toggleSelectAddress = () => {
    setShowSelectAddress(!showSelectAddress);
  };

  useEffect(() => {
    if (serachParams.get("success")) {
      toast.success("Pagamento efetuado com sucesso.");
    }
    if (serachParams.get("canceled")) {
      toast.error("Algo deu errado, tente novamente.");
    }
  }, [serachParams]);

  useEffect(() => {
    if (cartModal.isOpen === true) {
      document.body.style.overflow = "hidden";
    }
    if (cartModal.isOpen === false) {
      document.body.style.overflow = "auto";
    }
  }, []);

  const onBack = () => {
    if (step === STEPS.LOCATION) {
      return setStep((value) => value - 2);
    }
    setStep((value) => value - 1);
  };

  const onNext = () => {
    if (step === STEPS.APPOINTMENT) {
      return setStep((value) => value + 2);
    }
    if (step === STEPS.LOCATION && !isOpen) {
      toast.error("Restaurante está fechado");
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
      setIsLoading(true);
      const response = await api.post("/testCheckout", {
        avaliableAppointmentId: appointmentId,
        addressId: addressId,
      });
      toast.success("Pedido enviado");
      cartModal.onClose();
      window.location = response.data.url;
    } catch (err) {
      console.log(err);
      toast.error("Algo deu errado");
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (ctp: CartToProduct) => {
    try {
      setIsLoading(true);
      await api.delete("/removeProduct", {
        data: {
          productId: ctp.productId,
          cartProductId: ctp.id,
        },
      });
      toast.success("product deleted successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      const response = await api.get("/cart");
      setCart(response.data);
    };
    fetchCart();
  }, [cartModal, addCartModal, cartModal.cartItems]);

  if (cart) {
    cartModal.cartItems = cart.cartProducts;
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PAYMENT) {
      return "Escolher forma de pagamento";
    }
    return "Próximo";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PRODUCTS) {
      return undefined;
    }

    return "Voltar";
  }, [step]);

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
          className="flex flex-col items-center bg-slate-200 rounded-xl p-5 hover:cursor-pointer w-1/2"
          onClick={() => setStep((value) => value + 1)}
        >
          <CalendarIcon size={50} />
          <p className="text-lg font-semibold">Busque no restaurante</p>
        </div>
        <div
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

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col  gap-3">
        {showSelectAddress && user.addresses ? (
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
              disabled={isSelectOpen || !isOpen}
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
              disabled={!isOpen}
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
        <div>
          {appointment && (
            <p>
              {new Date(appointment.startDate).toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo",
                dateStyle: "short",
                timeStyle: "short",
              })}
            </p>
          )}
          {address && (
            <p>
              {" "}
              {address.street}, {address.streetNumber} - apto{" "}
              {address.complementNumber} - {address.neighborhood}, {address.CEP}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Modal
        title="Carrinho"
        actionLabel={actionLabel}
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
