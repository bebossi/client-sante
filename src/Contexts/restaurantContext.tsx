import { createContext, useEffect, useState } from 'react';
import { api } from '../api';

type IsRestaurantOpenType = {
  isOpen: boolean | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const RestaurantContext = createContext<IsRestaurantOpenType | null>(null);

const RestaurantContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchIsOpen = async () => {
      try {
        const response = await api.get('/getIsOpen');
        setIsOpen(response.data.isOpen);
      } catch (err) {
        console.log(err);
      }
    };
    fetchIsOpen();
  }, [isOpen]);

  return (
    <RestaurantContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContextProvider, RestaurantContext };
