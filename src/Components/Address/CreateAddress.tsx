import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
  LoadScriptProps,
} from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { api } from '../../api';
import Button from '../Button';
import { toast } from 'react-hot-toast';
import { Address } from '../../interfaces';

interface MapAddressProps {
  handleAddress: (addressId: string, selectedAddress?: Address) => void;
}

const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY as string;

const libraries: LoadScriptProps['libraries'] = ['places'];

const MapAddress: React.FC<MapAddressProps> = ({ handleAddress }) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  }>();
  const [distance, setDistance] = useState<string>('');
  const [form, setForm] = useState({
    street: '',
    streetNumber: '',
    neighborhood: '',
    cep: '',
    city: '',
    apartmentNumber: '',
  });

  const addressRef = useRef<HTMLInputElement>(null);

  const calculateRoute = useCallback(async () => {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: -19.9126701, lng: -43.9207056 },
      destination: coordinates as { lat: number; lng: number },
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDistance(results.routes[0].legs[0].distance!.text);
  }, [coordinates]);

  useEffect(() => {
    const addressValue = addressRef.current?.value;

    if (addressValue) {
      const addressParts = addressValue.split(', ');

      if (addressParts.length > 3) {
        const [street, streetNumberAndNeighborhood, city] = addressParts;
        const [streetNumber, neighborhood] = streetNumberAndNeighborhood.split(' - ');

        setForm((prevForm) => ({
          ...prevForm,
          street,
          streetNumber,
          neighborhood,
          city,
          apartmentNumber: '',
        }));

        calculateRoute();
      }
    }
  }, [calculateRoute, addressRef.current?.value, coordinates]);

  const { value, setValue, clearSuggestions } = usePlacesAutocomplete({
    callbackName: 'MapAddress',
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey as string,
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSelectAddress = async (address: string) => {
    try {
      if (!address.toLowerCase().startsWith('rua')) {
        address = `rua ${address}`;
      }
      setValue(address, false);
      clearSuggestions();
      const result = addressRef.current?.value as string;
      const results = await getGeocode({ address: result });
      const cep = results[0].address_components[6].long_name;
      setForm({
        ...form,
        cep: cep,
      });
      if (results.length === 0) {
        toast.error('No results found for the selected address');
        return;
      }
      const { lat, lng } = getLatLng(results[0]);
      setCoordinates({ lat, lng });
    } catch (err) {
      console.log(err);
    }
  };

  const calculatedDistance = parseFloat(distance.split(' ')[0]);

  if (calculatedDistance >= 2) {
    toast.error('Distance is bigger than 2km');
  }

  const onSubmit = async () => {
    try {
      const calculatedDistance = parseFloat(distance.split(' ')[0]);
      if (calculatedDistance > 2) {
        toast.error('Distância maior que 2km');
        return;
      }
      const formattedCep = form.cep.replace('-', '');
      const response = await api.post('/address', {
        street: form.street,
        neighborhood: form.neighborhood,
        streetNumber: form.streetNumber,
        complementNumber: Number(form.apartmentNumber) || '',
        CEP: Number(formattedCep),
      });
      handleAddress(response.data.id, response.data);
      toast.success('Address added');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="h-full w-full flex flex-col ">
        <div className="w-full">
          <Autocomplete
            onLoad={(autocomplete) => {
              autocomplete.setFields(['formatted_address', 'name', 'address_components']);
            }}
            onPlaceChanged={() => handleSelectAddress(value)}
            className="w-full"
          >
            <input
              ref={addressRef}
              data-cy="create-address"
              className="w-full border-[1px] border-black rounded-lg"
              placeholder="Procure um endereço"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </Autocomplete>

          {addressRef.current?.value && coordinates && (
            <>
              <form {...form} className="m-2 " name="Map">
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="text"
                  placeholder="Apt, Suite, etc (optional)"
                  value={form.apartmentNumber}
                  onChange={(e) => setForm({ ...form, apartmentNumber: e.target.value })}
                />
              </form>
            </>
          )}
        </div>
        {addressRef.current?.value && coordinates && (
          <>
            <GoogleMap
              zoom={11}
              center={coordinates}
              mapContainerClassName={'map-container'}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {coordinates && <Marker position={coordinates} />}
            </GoogleMap>
            <Button label="Confirmar endereço" onClick={onSubmit} small />
          </>
        )}
      </div>
    </>
  );
};

export default MapAddress;
