import { createContext, useEffect, useState } from 'react';
import { api } from '../api';

type IsRestaurantOpenType = {
  isRestaurantOpen: boolean | null;
  setIsRestaurantOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const RestaurantContext = createContext<IsRestaurantOpenType | null>(null);

const RestaurantContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isRestaurantOpen, setIsRestaurantOpen] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const fetchIsOpen = async () => {
      try {
        const response = await api.get('/getIsOpen');
        setIsRestaurantOpen(response.data.isOpen);
      } catch (err) {
        console.log(err);
      }
    };
    fetchIsOpen();
  }, [isRestaurantOpen]);

  return (
    <RestaurantContext.Provider
      value={{ isRestaurantOpen, setIsRestaurantOpen }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContextProvider, RestaurantContext };
