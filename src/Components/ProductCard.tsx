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
  onClick
}) => {
  return (
    <div onClick={onClick} className="m-5 mx-4  overflow-hidden rounded-xl border shadow-lg max-h-52 cursor-pointer hover:opacity-60">
      <div className="flex overflow-hidden bg-white  ">
        <div className="flex w-full flex-col p-0 sm:w-1/2 sm:p-1 md:p-3 lg:p-4 ">
          <h2 className="text-xl font-bold text-gray-900 ">{title}</h2>
          <p className="mt-2 mb-2 max-w-md text-gray-500 line-clamp-2 sm:line-clamp-2 md:line-clamp-3 lg:line-clamp-4 xl:line-clamp-5 ">{description}</p>
          <p className="font-semibold"> R${price}</p>
        </div>
        <div className="ml-auto max-h-52 w-full bg-white  sm:h-auto sm:w-1/2 lg:w-2/5">
          <img
            className="h-full w-full object-cover rounded-lg"
            src={image}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
