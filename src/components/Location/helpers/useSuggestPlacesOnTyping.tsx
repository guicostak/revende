import statesCities from "../../../common/utils/states-cities.json";

interface ICity {
  sigla: string;
  nome: string;
  cidades: string[];
}

interface IStatesCities {
  estados: ICity[];
}

export const useSuggestPlacesOnTyping = () => {
  const suggestPlaces = (input: string): string[] => {
    if (input.trim() === "") {
      const allCities = statesCities.estados.flatMap((state: ICity) => state.cidades);
      return Array.from(new Set(allCities)).sort().slice(0, 10);
    }

    const suggestions: string[] = statesCities.estados.flatMap((state: ICity) =>
      state.cidades.filter((city: string) =>
        city.toLowerCase().startsWith(input.toLowerCase())
      )
    );

    return Array.from(new Set(suggestions)).sort().slice(0, 10);
  };

  return suggestPlaces;
};
