"use strict";

import { useEffect, useRef, useState } from "react";

const CONFIGURATION = {
  ctaTitle: "Checkout",
  mapOptions: {
    center: { lat: -19.8416, lng: -43.986511 },
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: true,
    zoom: 11,
    zoomControl: true, 
    maxZoom: 22,
    mapId: "",
  },
  mapsApiKey: "AIzaSyBe6KfUOJepY8F-Sg86-M1F5Su9-NmxXFc",
  capabilities: {
    addressAutocompleteControl: true,
    mapDisplayControl: true,
    ctaControl: true,
  },
};

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current && !mapLoaded) {
       new google.maps.Map(document.getElementById("gmp-map")!, { 
        zoom: CONFIGURATION.mapOptions.zoom,
        center: { lat: 37.4221, lng: -122.0841 },
        mapTypeControl: false,
        fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
        zoomControl: CONFIGURATION.mapOptions.zoomControl,
        streetViewControl: CONFIGURATION.mapOptions.streetViewControl,
      });
      setMapLoaded(true);
    }
  }, []);

 
  const componentForm = [
    "location",
    "locality",
    "administrative_area_level_1",
    "country",
    "postal_code",
  ];
 
  const mapDiv = document.createElement("div");
  mapDiv.id = "gmp-map";
  document.body.appendChild(mapDiv);

  const getFormInputElement = (component: any) =>
    document.getElementById(component + "-input");
  const map = new google.maps.Map(document.getElementById("gmp-map")!, {
    zoom: CONFIGURATION.mapOptions.zoom,
    center: { lat: -19.8816, lng: -43.986511 },
    mapTypeControl: false,
    fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
    zoomControl: CONFIGURATION.mapOptions.zoomControl,
    streetViewControl: CONFIGURATION.mapOptions.streetViewControl,
  });
  const marker = new google.maps.Marker({ map: map, draggable: false });
  const autocompleteInput = getFormInputElement("location") as HTMLInputElement;

  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  });
  autocomplete.addListener("place_changed", function () {
    marker.setVisible(false);
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    renderAddress(place);
    fillInAddress(place);
  });

  function fillInAddress(place: any) {
    const addressNameFormat: any = {
      street_number: "short_name",
      route: "long_name",
      locality: "long_name",
      administrative_area_level_1: "short_name",
      country: "long_name",
      postal_code: "short_name",
    };
    const getAddressComp = function (type: any) {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return "";
    };
    (getFormInputElement("location")! as HTMLInputElement).value =
      getAddressComp("street_number") + " " + getAddressComp("route");
    for (const component of componentForm) {
      if (component !== "location") {
        (getFormInputElement(component)! as HTMLInputElement).value =
          getAddressComp(component);
      }
    }
  }

  function renderAddress(place: any) {
    map.setCenter(place.geometry.location);
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  }

  return (
    <>
      <div className="flex h-full w-full mt-1 ">
        <div className="bg-white w-full p-5 flex flex-col justify-around">
          <div>
            <img
              className="relative -top-0 font-medium"
              src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg"
              alt=""
            />
            <span className="relative -top-1">Address Selection</span>
          </div>
          <input type="text" placeholder="Address" id="location-input" />
          <input type="text" placeholder="Apt, Suite, etc (optional)" />
          <input type="text" placeholder="City" id="locality-input" />
          <div className="flex justify-between">
            <input
              type="text"
              className="max-w-[120px]"
              placeholder="State/Province"
              id="administrative_area_level_1-input"
            />
            <input
              type="text"
              className="max-w-[120px]"
              placeholder="Zip/Postal code"
              id="postal_code-input"
            />
          </div>
          <input type="text" placeholder="Country" id="country-input" />
          <button className="h-10 w-full bg-blue-500 text-base border-0 rounded-md shadow-md hover:cursor-pointer">
            Checkout
          </button>
        </div>
        <div className="w-full" id="gmp-map"></div>
      </div>
    </>
  );
};

export default Map;
