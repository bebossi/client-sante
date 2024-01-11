import { useContext, useEffect, useState } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import { api } from '../../api';
import { useAddToCartModal } from '../../hooks';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { Topping } from '../../interfaces';
import toast from 'react-hot-toast';
import { UserContext } from '../../Contexts/currentUser';
import { useLockBody } from '../../hooks/useLockBoody';

interface ToppingProps {
  topping: Topping;
  quantity: number;
}

export const AddToCartModal = () => {
  useLockBody();
  const addCartModal = useAddToCartModal();
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const [isLoading, setIsLoading] = useState(false);
  const [toppings, setToppings] = useState<ToppingProps[]>([]);
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    let initialToppings: ToppingProps[] | undefined = undefined;
    if (addCartModal.product?.toppings) {
      initialToppings = addCartModal.product.toppings.map((topping: Topping) => ({
        topping,
        quantity: 0,
      }));
      setToppings(initialToppings);
    }
  }, [addCartModal.product?.toppings]);

  const increaseQuantityProduct = () => {
    setProductQuantity(productQuantity + 1);
  };
  const decreaseQuantityProduct = () => {
    if (productQuantity === 1) {
      return;
    }
    setProductQuantity(productQuantity - 1);
  };

  const onAddTopping = (toppingId: string) => {
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

  const onSubTopping = (toppingId: string) => {
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

  const addProductToCart = async () => {
    try {
      setIsLoading(true);

      user &&
        (await api.post('/addProduct', {
          productId: addCartModal?.product?.id,
          toppings: toppings,
          quantity: productQuantity,
        }));

      toast.success('Produto addicionado ao carrinho');
      addCartModal.onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPriceToppings = toppings.reduce((total, topping) => {
    return (total += topping.quantity * topping.topping.price);
  }, 0);

  const subtotal =
    Number(totalPriceToppings) * productQuantity +
    Number(addCartModal?.product?.price) * productQuantity;

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Heading
        title={addCartModal.product?.name}
        subtitle={addCartModal.product?.description}
        image={addCartModal.product?.image}
      />
      <p>A partir de R${addCartModal.product?.price}</p>
      <div className="bg-slate-300 p-4 rounded-md">
        <h1 className="text-lg font-semibold">Adicionais</h1>
        <h2 className="text-sm text-gray-600">Escolha ate 10 adicionais</h2>
      </div>
      <div>
        {addCartModal.product?.toppings?.map((topping) => (
          <div key={topping.id}>
            <div className="flex justify-between py-1">
              <div>
                <p className="text-base font-mono">{topping.name}</p>
                <p className="font-semibold">R${topping.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <>
                  <BiMinus
                    data-cy="decreaseTopping"
                    className="cursor-pointer"
                    onClick={() => onSubTopping(topping.id)}
                  />
                  <p data-cy="topping-quantity">
                    {toppings?.find((item) => item.topping.id === topping.id)?.quantity ||
                      0}
                  </p>
                </>
                <BiPlus
                  data-cy="increaseTopping"
                  className="mr-2 cursor-pointer "
                  onClick={() => onAddTopping(topping.id)}
                />
              </div>
            </div>
            <hr className="w-full h-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
  const thirdAction = (
    <div className="flex py-2 justify-center items-center gap-x-4 border-black border-[1px] rounded-lg w-full h-full text-xl font-semibold">
      <BiMinus
        data-cy="decreaseQuantity"
        size={30}
        className="cursor-pointer"
        onClick={() => decreaseQuantityProduct()}
      />
      <p data-cy="product-quantity">{productQuantity}</p>
      <BiPlus
        data-cy="increaseQuantity"
        size={28}
        className="mr-2 cursor-pointer"
        onClick={() => increaseQuantityProduct()}
      />
    </div>
  );

  return (
    <div>
      <Modal
        title="Detalhes do item"
        actionLabel={isLoading ? 'Adicionando...' : `Adicionar  R$${subtotal}`}
        body={bodyContent}
        onClose={addCartModal.onClose}
        disabled={isLoading}
        onSubmit={addProductToCart}
        isOpen={addCartModal.isOpen}
        thirdAction={thirdAction}
      />
    </div>
  );
};

export default AddToCartModal;
