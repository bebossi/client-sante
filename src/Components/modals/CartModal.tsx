import { useContext, useEffect, useMemo, useState } from "react";
import useCartModal from "../../hooks/useCartModal";
import { api } from "../../api";
import Modal from "./Modal";
import { Cart, CartToProduct } from "../../interfaces";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import useAddToCartModal from "../../hooks/useAddToCartModal";
import MapAddress from "../Address/Map";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../auth/currentUser";

import SelectAddress from "../Address/SelectAddress";
import Button from "../Button";
// import Button from "../Button";

enum STEPS {
  PRODUCTS = 0,
  LOCATION = 1,
  PAYMENT = 2,
}

const CartModal = () => {
  const { user } = useContext(UserContext);
  const cartModal = useCartModal();
  const addCartModal = useAddToCartModal();

  const [step, setStep] = useState(STEPS.PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<Cart>();
  const [addressId, setAddressId] = useState("");
  const [showSelectAddress, setShowSelectAddress] = useState(true);
  const [isSelectOpen, setIsSelectOpen] = useState(false); // Track if the select is open


  const [serachParams] = useSearchParams();

  const toggleSelectAddress = () => {
    setShowSelectAddress(!showSelectAddress);
  };
  useEffect(() => {
    if (serachParams.get("success")) {
      toast.success("Payment completed.");
    }
    if (serachParams.get("canceled")) {
      toast.error("Something went wrong");
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
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const handleAddressId = (addressId: string) => {
    setAddressId(addressId);
  };
  const handleIsSelectOpen = () => {
    setIsSelectOpen(!isSelectOpen)
    console.log(isSelectOpen)
  }

  const onSubmit = async () => {
    try {
      if (step !== STEPS.PAYMENT) {
        return onNext();
      }
      setIsLoading(true);
      const response = await api.post("/testCheckout", {
        addressId: addressId,
      });
      toast.success("Pedido enviado");
      cartModal.onClose();
      window.location = response.data.url;
    } catch (err) {
      console.log(err);
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
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PRODUCTS) {
      return undefined;
    }

    return "Back";
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
  // const footerContent = ( // AVALIAR ISSO TAMBEM
  //   <div className="flex items-center justify-between  ">
  //     <p className="font-semibold">Subtotal: </p>
  //     <p className="font-semibold"> R${cart?.subtotal}</p>
  //   </div>
  // );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col  gap-3">
        {showSelectAddress && user.addresses ? ( // AVALIAR ISSO DEPOIS
          <>
            <SelectAddress  user={user} handleIsSelectOpen={handleIsSelectOpen} handleAddressId={handleAddressId} />
            <Button
              label="create address"
              onClick={toggleSelectAddress}
              outline
              small
              disabled={isSelectOpen}
            />
          </>
        ) : (
          <div className="flex flex-col gap-3 ">
            <MapAddress handleAddressId={handleAddressId} />
            <Button
              label="select an existing address"
              onClick={toggleSelectAddress}
              outline
              small
            />
          </div>
        )}
      </div>
    );
  }

  if (step === STEPS.PAYMENT) {
    bodyContent = <div className="flex flex-col "></div>;
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
        // footer={footerContent}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.PRODUCTS ? undefined : onBack}
      />
    </div>
  );
};

export default CartModal;
