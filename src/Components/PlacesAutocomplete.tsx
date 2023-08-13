// import { Dispatch, SetStateAction } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"

// interface PlacesAutocompleteProps {
//     setSelected: Dispatch<SetStateAction<number[]>>
// }

const PlacesAutocomplete = ({
    setSelected,
  }: {
    setSelected: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }> >;
  }) => {    
    const {ready, value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete()

    const handleSelect = async (address: string) => {
        setValue(address, false)
        clearSuggestions()

        const results = await getGeocode({address})

        const {lat, lng} =  getLatLng(results[0])
        const newState = {
            lat: lat,
            lng: lng,
          }
        setSelected(newState)
    }


  return (
    <div onSelect={() => handleSelect(value)}>
      <input value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} className="" placeholder="Procure um endereço" />
      <div>
        {status === "OK" && (
            data.map(({place_id, description}) => (
                <div key={place_id} >{description}</div>
            ))
        )}
      </div>
    </div>
  )
}

export default PlacesAutocomplete
