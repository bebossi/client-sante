import React from 'react';
import SelectAddress from '../../../Address/SelectAddress';
import MapAddress from '../../../Address/CreateAddress';
import Button from '../../../Button';
import { Address, User } from '../../../../interfaces';

interface DeliveryProps {
  showUserAdresses: boolean;
  user: User | null;
  toggleIsSelectOpen: () => void;
  handleAddress: (addressId: string, selectedAddress?: Address) => void;
  toggleShowSelectAddress: () => void;
  isSelectOpen: boolean;
  isRestaurantOpen: boolean | null;
}

export const Delivery: React.FC<DeliveryProps> = ({
  showUserAdresses,
  user,
  toggleIsSelectOpen,
  handleAddress,
  toggleShowSelectAddress,
  isSelectOpen,
  isRestaurantOpen,
}) => {
  return (
    <div className="flex flex-col  gap-3">
      {showUserAdresses && user?.addresses ? (
        <>
          <SelectAddress
            user={user}
            toggleIsSelectOpen={toggleIsSelectOpen}
            handleAddress={handleAddress}
          />
          <Button
            label="Crie um endereço"
            onClick={toggleShowSelectAddress}
            outline
            small
            disabled={isSelectOpen || !isRestaurantOpen}
          />
        </>
      ) : (
        <div className="flex flex-col gap-3 ">
          <MapAddress handleAddress={handleAddress} />
          <Button
            label="Selecione um endereço salvo"
            onClick={toggleShowSelectAddress}
            outline
            small
            disabled={!isRestaurantOpen}
          />
        </div>
      )}
    </div>
  );
};

export default Delivery;
