import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
const B = () => {
  const [selected, setSelected] = useState({ lat: -19.9129, lng: -43.9409 });
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });
  const {
    value,
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });

    const { lat, lng } = getLatLng(results[0]);

    setSelected({ lat, lng });
  };

  return (
    <>
      <div className="h-full w-full">
        <div>
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
        </div>
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
      </div>
    </>
  );
};

export default B;
