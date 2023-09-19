interface CardProduct {
  title: string;
  description: string;
  price: number;
  image: string;
  onClick: () => void;
}

const ProductCard: React.FC<CardProduct> = ({
  title,
  description,
  price,
  image,
  onClick,
}) => {
  return (
    <div
      data-cy="card-product"
      onClick={onClick}
      className="mx-2 mb-4 overflow-hidden rounded-xl border shadow-lg max-h-60 cursor-pointer m-1 ease-in-out delay-100 hover:scale-95 duration-300 "
    >
      <div className="flex overflow-hidden bg-white  ">
        <div className="flex w-full flex-col p-1 justify-between sm:w-1/2 sm:p-1 md:p-3 lg:p-4 ">
          <h2 className="text-base font-bold text-gray-700 line-clamp-2 lg:text-2xl  sm:text-xl">
            {title}
          </h2>
          <p className="mt-2 mb-2 max-w-md text-gray-500 line-clamp-4 sm:line-clamp-4 md:line-clamp-5 lg:text-xl  sm:text-lg lg:line-clamp-4  ">
            {description}
          </p>
          <p className="font-semibold lg:text-2xl  sm:text-xl"> R${price}</p>
        </div>
        <div className="ml-auto max-h-52 w-full bg-white  sm:h-auto sm:w-1/2 lg:w-2/5">
          <img
            className="h-full w-full object-fill rounded-lg "
            src={image}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
