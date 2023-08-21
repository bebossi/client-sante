import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { api } from "../../api";
import Button from "../Button";
import { toast } from "react-hot-toast";

interface MapAddressProps {
  handleAddressId: (addressId: string) => void;
}

const MapAddress: React.FC<MapAddressProps> = ({ handleAddressId }) => {
  const [selected, setSelected] = useState({ lat: -19.9129, lng: -43.9409 });
  const [selectedAddress, setSelectedAddress] = useState("");
  const [form, setForm] = useState({
    street: "",
    streetNumber: "",
    neighborhood: "",
    CEP: "",
    city: "",
    complementNumber: "",
  });

  useEffect(() => {
    if (selectedAddress) {
      const addressParts = selectedAddress.split(", ");
      const streetNumberAndNeighborhood = addressParts[1].split(" - ");

      setForm({
        street: addressParts[0],
        streetNumber: streetNumberAndNeighborhood[0],
        neighborhood: streetNumberAndNeighborhood[1],
        CEP: addressParts[3],
        city: addressParts[2],
        complementNumber: "",
      });
    }
  }, [selectedAddress]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });
  const { value, setValue, clearSuggestions } = usePlacesAutocomplete();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);

    setSelected({ lat, lng });
    setSelectedAddress(results[0].formatted_address);
  };

  const onSubmit = async () => {
    try {
      const cleanedCEP = form.CEP.replace(/-/g, "");

      const response = await api.post("/address", {
        street: form.street,
        neighborhood: form.neighborhood,
        streetNumber: Number(form.streetNumber),
        complementNumber: Number(form.complementNumber) || "",
        CEP: Number(cleanedCEP),
      });
      handleAddressId(response.data.id);
      toast.success("Address added");
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
              autocomplete.setFields(["formatted_address"]);
            }}
            onPlaceChanged={() => handleSelect(value)}
            className="w-full"
          >
            <input
              onClick={() => handleSelect}
              className="w-full border-[1px] border-black rounded-lg"
              placeholder="Procure um endereço"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </Autocomplete>
          {selectedAddress && selected && (
            <>
              <form {...form} className="m-2 ">
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="text"
                  placeholder="Street"
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                />
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="number"
                  placeholder="Number"
                  value={form.streetNumber}
                  onChange={(e) =>
                    setForm({ ...form, streetNumber: e.target.value })
                  }
                />
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="text"
                  placeholder="Neighborhood"
                  value={form.neighborhood}
                  onChange={(e) =>
                    setForm({ ...form, neighborhood: e.target.value })
                  }
                />
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="string"
                  placeholder="Zip/Postal code"
                  value={form.CEP}
                  onChange={(e) => setForm({ ...form, CEP: e.target.value })}
                />
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="text"
                  placeholder="Apt, Suite, etc (optional)"
                  value={form.complementNumber}
                  onChange={(e) =>
                    setForm({ ...form, complementNumber: e.target.value })
                  }
                />
              </form>
            </>
          )}
        </div>
        {selectedAddress && selected && (
          <>
            <GoogleMap
              zoom={11}
              center={selected}
              mapContainerClassName={"map-container"}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {selected && <Marker position={selected} />}
            </GoogleMap>
            <Button label="Confirmar endereço" onClick={onSubmit} />
          </>
        )}
      </div>
    </>
  );
};

export default MapAddress;
