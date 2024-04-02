  import React from "react";

  interface UseCurrentCityProps {
    apiKey: string;
  }

  export const useCurrentCity = ({ apiKey }: UseCurrentCityProps) => {
    const [city, setCity] = React.useState<string | null>(null);

    React.useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Call the Geocoding API to get city information
            fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            )
              .then((response) => response.json())
              .then((data) => {
                // Extract the city name from the API response
                const city =
                  data.results[0]?.address_components.find(
                    (component: any) =>
                      component.types.includes("locality") ||
                      component.types.includes("administrative_area_level_1")
                  )?.long_name || "Qualquer lugar";

                // Set the city state
                setCity(city);
              })
              .catch((error) => {
                console.error("Error fetching city information:", error);
              });
          },
          (error) => {
            console.error("Error getting user's location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser");
      }
    }, [apiKey]);

    return city;
  };
