import React, { useState, useEffect } from "react";
import { useTypingEffect } from "../helpers/useTypingEffect";

export interface ISearchbar {
  fieldValue: string;
  placeholder: string;
}

export const useSearchbarHook = () => {
  const searchbarPlaceholder = useTypingEffect();
  const [searchbar, setSearchbar] = useState<ISearchbar>({
    fieldValue: "",
    placeholder: "",
  });

  useEffect(() => {
    const isSearchbarInputEmpty = !searchbar.fieldValue;
    if(isSearchbarInputEmpty)
    setSearchbar((prevSearchbar) => ({ ...prevSearchbar, placeholder: searchbarPlaceholder }));
  }, [searchbarPlaceholder]);

  const handleSearchbarInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchbar((prevSearchbar) => ({ ...prevSearchbar, field: event.target.value }));
  };

  const handleSearchbarSubmit = (): void => {
    console.log(`Searching for: "${searchbar.fieldValue}"`);
  };

  return {
    searchbar,
    handleSearchbarInputChange,
    handleSearchbarSubmit,
  };
};
