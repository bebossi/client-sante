import { IoMdClose } from 'react-icons/io';
import { Cart, CartToProduct } from '../../../../interfaces';
import { api } from '../../../../api';
import toast from 'react-hot-toast';

interface ProductsProps {
  cart: Cart;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Products: React.FC<ProductsProps> = ({ cart, setIsLoading }) => {
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
  return (
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
};

export default Products;
