import { createContext, useContext, useState } from 'react';
import { fetchCoordinates } from '../services/maps';

export const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [people, setPeople] = useState([
    { name: '', location: '', lat: '', long: '' },
  ]);
  const peopleToGeoJSON = (array) => {
    const geoJSON = array.map(({ name, location, lat, long }) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lat, long],
        },
        properties: {
          name,
          location,
        },
      };
    });
  };

  const handleFormSubmit = (formValues) => {
    let peopleArray = [];
    formValues.map(async (value) => {
      const coordinates = await fetchCoordinates({ zip: value.location });
      peopleArray.push({
        name: value.name,
        location: value.location,
        lat: coordinates[0],
        long: coordinates[1],
      });
    });
    setPeople(peopleArray);
  };

  return (
    <TravelContext.Provider
      value={{ people, handleFormSubmit, peopleToGeoJSON }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravelContext = () => {
  const context = useContext(TravelContext);

  if (context === undefined) {
    throw new Error('useTravelContext must be used within TravelProvider');
  }

  return context;
};
