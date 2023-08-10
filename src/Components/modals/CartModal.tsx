import { useEffect, useState } from "react";
import useCartModal from "../../hooks/useCartModal";
import { api } from "../../api";
import Modal from "./Modal";
import { Cart, CartToProduct } from "../../interfaces";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const CartModal = () => {
  const cartModal = useCartModal();

  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<Cart>();

  useEffect(() => {
    if (cartModal.isOpen === true) {
      document.body.style.overflow = "hidden";
    }
    if (cartModal.isOpen === false) {
      document.body.style.overflow = "auto";
    }
  }, [cartModal.isOpen]); 

 

  const onSubmit = async () => {
    try{
      setIsLoading(true)
      const response = await api.post("/testCheckout")

      console.log(response.data)

      toast.success("Pedido enviado")
      cartModal.onClose()
    } catch(err){
      console.log(err);
    } finally {
      setIsLoading(false)
    }
  };

  const removeProduct = async (ctp: CartToProduct) => {
    try{
      setIsLoading(true)
      const response = await api.delete("/remove", {
        data:{
        productId: ctp.productId,
        cartProductId: ctp.id
        }
      })
      console.log(response.data)

    } catch(err){
      console.log(err);
    } finally{
      setIsLoading(false)
    }
  }
  useEffect(() => { 
    const fetchCart = async () => {
      const response = await api.get("/cart");

      setCart(response.data);
    };
    fetchCart();
  }, [onSubmit, removeProduct]);

  const bodyContent = (
    <div>
      {cart?.cartProducts.map((cartProduct) => (
        <div key={cartProduct.id} className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-start justify-between">
            <div className="flex gap-x-2">
            <p>{cartProduct.quantity}x</p>
            <p className="font-semibold text-lg">{cartProduct.product.name}</p>
            </div>
            {cartProduct.cartToProductToppings.map((ctpt) => (
              <div key={ctpt.id} className="flex text-gray-500 gap-x-3">
                <p>{ctpt.quantity / cartProduct.quantity}x</p>
                <p className="">{ctpt.topping.name}</p>
              </div>
            ))}
          </div>
          <div className="flex">

          <img
            src={cartProduct.product.image}
            className="w-20 h-20 rounded-lg shadow-lg"
          />
          <IoMdClose className="ml-2 hover:cursor-pointer" size={12} onClick={() => removeProduct(cartProduct)} />
          </div>
        </div>
      ))}
    </div>
  );
  const footerContent = (
    <div className="flex items-center justify-between ">
        <p className="font-semibold">Subtotal:  </p>
        <p> R${cart?.subtotal}</p>
    </div>
  )

  

  return (
    <div>
      <Modal
        title="Carrinho"
        actionLabel={`Escolher forma de pagamento`}
        body={bodyContent}
        onClose={cartModal.onClose}
        disabled={isLoading}
        onSubmit={onSubmit}
        isOpen={cartModal.isOpen}
        footer={footerContent}

      />
    </div>
  );
};

export default CartModal;
