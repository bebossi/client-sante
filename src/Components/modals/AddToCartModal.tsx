import { useEffect, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import { api } from "../../api";
import useAddToCartModal from "../../hooks/useAddToCartModal";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Topping } from "../../interfaces";
import toast from "react-hot-toast";

interface ToppingProps {
  topping: Topping;
  quantity: number;
}

const AddToCartModal = () => {
  const addCartModal = useAddToCartModal();

  const [isLoading, setIsLoading] = useState(false);
  const [toppings, setToppings] = useState<ToppingProps[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (addCartModal.isOpen === true) {
      document.body.style.overflow = "hidden";
    }
    if (addCartModal.isOpen === false) {
      document.body.style.overflow = "auto";
    }
  }, [addCartModal.isOpen]);

  useEffect(() => {
    let initialToppings: ToppingProps[] | undefined = undefined;
    if (addCartModal.product?.toppings) {
      initialToppings = addCartModal.product.toppings.map(
        (topping: Topping) => ({
          topping,
          quantity: 0,
        })
      );
      setToppings(initialToppings);
    }
  }, [addCartModal.product?.toppings]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const onAdd = (toppingId: string) => {
    if (!toppings) {
      return;
    }
    const toppingIndex = toppings?.findIndex(
      (topping) => topping.topping.id === toppingId
    );

    if (toppingIndex !== -1) {
      const updatedToppings = [...toppings];
      updatedToppings[toppingIndex].quantity += 1;
      setToppings(updatedToppings);
    }
  };

  const onSub = (toppingId: string) => {
    if (!toppings) {
      return;
    }
    const toppingIndex = toppings?.findIndex(
      (topping) => topping.topping.id === toppingId
    );
    if (toppingIndex !== -1) {
      const updatedToppings = [...toppings];
      updatedToppings[toppingIndex].quantity -= 1;
      setToppings(updatedToppings);
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
    await api.post("/addProduct", {
        productId: addCartModal?.product?.id,
        toppings: toppings,
        quantity: quantity,
      });
      toast.success("Product added successfully")
      addCartModal.onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  let totalPriceToppings = toppings.reduce((total, topping) => {
    return (total += topping.quantity * topping.topping.price);
  }, 0);

  const subtotal =
    Number(totalPriceToppings) * quantity +
    Number(addCartModal?.product?.price) * quantity;

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Heading
        title={addCartModal.product?.name}
        subtitle={addCartModal.product?.description}
        image={addCartModal.product?.image}
      />
      <p>R${addCartModal.product?.price}</p>
      <div className="bg-slate-300 p-4 rounded-md">
        <h1 className="text-lg font-semibold">Adicionais</h1>
        <h2 className="text-sm text-gray-600">Escolha ate 10 adicionais</h2>
      </div>
      <div>
        {addCartModal.product?.toppings?.map((topping) => (
          <div key={topping.id}>
            <div className="flex justify-between">
              <div>
                <p className="text-base font-mono">{topping.name}</p>
                <p className="font-semibold">R${topping.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <>
                  <BiMinus
                    className="cursor-pointer"
                    onClick={() => onSub(topping.id)}
                  />
                  <p>
                    {toppings?.find((item) => item.topping.id === topping.id)
                      ?.quantity || 0}
                  </p>
                </>

                <BiPlus
                  className="mr-2 cursor-pointer "
                  onClick={() => onAdd(topping.id)}
                />
              </div>
            </div>
            <hr className="w-full h-0.5" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-x-2 border-black border-[1px] rounded-lg">
        <BiMinus
          className="cursor-pointer"
          onClick={() => decreaseQuantity()}
        />
        {quantity}
        <BiPlus
          className="mr-2 cursor-pointer "
          onClick={() => increaseQuantity()}
        />
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        title="Detalhes do item"
        actionLabel={`Adicionar  ${subtotal}`}
        body={bodyContent}
        onClose={addCartModal.onClose}
        disabled={isLoading}
        onSubmit={onSubmit}
        isOpen={addCartModal.isOpen}
      />
    </div>
  );
};

export default AddToCartModal;
