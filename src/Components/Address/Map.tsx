import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
  LoadScriptProps,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { api } from "../../api";
import Button from "../Button";
import { toast } from "react-hot-toast";
import { Address } from "../../interfaces";

interface MapAddressProps {
  handleAddressId: (addressId: string, selectedAddress?: Address) => void;
}
const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY as string;

const libraries: LoadScriptProps["libraries"] = ["places"];

const MapAddress: React.FC<MapAddressProps> = ({ handleAddressId }) => {
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    lat: number;
    lng: number;
  }>();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [distance, setDistance] = useState<string>("");
  const [form, setForm] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    apartamento: "",
  });

  useEffect(() => {
    if (selectedAddress) {
      const addressParts = selectedAddress.split(", ");
      const streetNumberAndNeighborhood = addressParts[1].split(" - ");

      setForm({
        rua: addressParts[0],
        numero: streetNumberAndNeighborhood[0],
        bairro: streetNumberAndNeighborhood[1],
        cep: addressParts[3],
        cidade: addressParts[2],
        apartamento: "",
      });
      calculateRoute();
    }
  }, [selectedAddress]);

  const { value, setValue, clearSuggestions } = usePlacesAutocomplete({
    callbackName: "MapAddress",
  });
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey as string,
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSelect = async (address: string) => {
    try {
      if (!address.toLowerCase().startsWith("rua")) {
        address = `rua ${address}`;
      }

      setValue(address, false);
      clearSuggestions();

      const results = await getGeocode({ address });
      if (results.length === 0) {
        toast.error("No results found for the selected address");
        return;
      }
      const { lat, lng } = getLatLng(results[0]);

      setSelectedCoordinates({ lat, lng });
      setSelectedAddress(results[0].formatted_address);
      console.log(results);
    } catch (err) {
      console.log(err);
    }
  };

  const calculateRoute = async () => {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: -19.9126701, lng: -43.9207056 },
      destination: selectedCoordinates as { lat: number; lng: number },
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDistance(results.routes[0].legs[0].distance!.text);
  };
  const calculatedDistance = parseFloat(distance.split(" ")[0]);

  if (calculatedDistance >= 2) {
    toast.error("Distance is bigger than 2km");
  }

  const onSubmit = async () => {
    try {
      const cleanedCEP = form.cep.replace(/-/g, "");

      const calculatedDistance = parseFloat(distance.split(" ")[0]);

      if (calculatedDistance > 2) {
        toast.error("Distância maior que 2km");
        return;
      }

      const response = await api.post("/address", {
        street: form.rua,
        neighborhood: form.bairro,
        streetNumber: Number(form.numero),
        complementNumber: Number(form.apartamento) || "",
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
              autocomplete.setFields([
                "formatted_address",
                "name",
                "address_components",
              ]);
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
          {selectedAddress && selectedCoordinates && (
            <>
              <form {...form} className="m-2 " name="Map">
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="text"
                  placeholder="Street"
                  value={form.rua}
                  onChange={(e) => setForm({ ...form, rua: e.target.value })}
                />
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="number"
                  placeholder="Number"
                  value={form.numero}
                  onChange={(e) => setForm({ ...form, numero: e.target.value })}
                />
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="text"
                  placeholder="Neighborhood"
                  value={form.bairro}
                  onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                />
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="text"
                  placeholder="City"
                  value={form.cidade}
                  onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                />
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="string"
                  placeholder="Zip/Postal code"
                  value={form.cep}
                  onChange={(e) => setForm({ ...form, cep: e.target.value })}
                />
                <input
                  className="border-slate-200 border-[1px] m-2 rounded-lg"
                  type="text"
                  placeholder="Apt, Suite, etc (optional)"
                  value={form.apartamento}
                  onChange={(e) =>
                    setForm({ ...form, apartamento: e.target.value })
                  }
                />
              </form>
            </>
          )}
        </div>
        {selectedAddress && selectedCoordinates && (
          <>
            <GoogleMap
              zoom={11}
              center={selectedCoordinates}
              mapContainerClassName={"map-container"}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {selectedCoordinates && <Marker position={selectedCoordinates} />}
            </GoogleMap>
            <Button label="Confirmar endereço" onClick={onSubmit} small />
          </>
        )}
      </div>
    </>
  );
};

export default MapAddress;
