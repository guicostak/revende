import React, { useState, useEffect } from "react";
import { useSuggestPlacesOnTyping } from "../helpers/useSuggestPlacesOnTyping";
import { useCurrentCity } from "../helpers/useCurrentCity";
import { GOOGLE_MAPS_API_KEY } from "../../../config/apiConfig";

export interface ILocation {
  fieldValue: string;
  selectedLocation: string;
  suggestions: string[]; 
}

export const useLocationHook = () => {
  const [location, setLocation] = useState<ILocation>({
    fieldValue: "",
    selectedLocation: "",
    suggestions: [],
  });

  const suggestPlace = useSuggestPlacesOnTyping();
  const apiKey = GOOGLE_MAPS_API_KEY;
  const currentCity = useCurrentCity({ apiKey }) || "Qualquer lugar";

  useEffect(() => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      selectedLocation: currentCity,
    }));
  }, [currentCity]);

  const handleLocationInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const fieldValue = event.target.value;

    setLocation((prevLocation) => ({
      ...prevLocation,
      fieldValue: fieldValue,
    }));

    suggestPlacesOnTyping(fieldValue);
  };

  const suggestPlacesOnTyping = async (input: string) => {
    const suggestions = await suggestPlace(input);
  
    const limitedSuggestions = suggestions.slice(0, 10);
  
    setLocation((prevLocation) => ({
      ...prevLocation,
      suggestions: limitedSuggestions || [],
    }));
  };

  useEffect(() => {
    if (location.fieldValue === "") {
      suggestPlacesOnTyping(location.fieldValue);
    }
  }, [location.fieldValue]); 

  const cleanFieldValue = () => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      fieldValue: "",
    }));
  };

  const handleLocationSubmit = (city: string): void => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      selectedLocation: city,
    }));
  };

  return {
    location,
    handleLocationInputChange,
    cleanFieldValue,
    handleLocationSubmit
  };
};
