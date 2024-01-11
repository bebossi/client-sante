import React from 'react';
import SelectAddress from '../../../Address/SelectAddress';
import MapAddress from '../../../Address/CreateAddress';
import Button from '../../../Button';
import { Address, User } from '../../../../interfaces';

interface DeliveryProps {
  showUserAdresses: boolean;
  user: User | null;
  handleIsSelectOpen: () => void;
  handleAddressId: (addressId: string, selectedAddress?: Address) => void;
  toggleSelectAddress: () => void;
  isSelectOpen: boolean;
  isRestaurantOpen: boolean | null;
}

export const Delivery: React.FC<DeliveryProps> = ({
  showUserAdresses,
  user,
  handleIsSelectOpen,
  handleAddressId,
  toggleSelectAddress,
  isSelectOpen,
  isRestaurantOpen,
}) => {
  return (
    <div className="flex flex-col  gap-3">
      {showUserAdresses && user?.addresses ? (
        <>
          <SelectAddress
            user={user}
            handleIsSelectOpen={handleIsSelectOpen}
            handleAddressId={handleAddressId}
          />
          <Button
            label="Crie um endereço"
            onClick={toggleSelectAddress}
            outline
            small
            disabled={isSelectOpen || !isRestaurantOpen}
          />
        </>
      ) : (
        <div className="flex flex-col gap-3 ">
          <MapAddress handleAddressId={handleAddressId} />
          <Button
            label="Selecione um endereço salvo"
            onClick={toggleSelectAddress}
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
