import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCoordinates } from '../services/maps';

export const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [people, setPeople] = useState([
    {
      type: '',
      properties: { name: '', zip: '', city: '' },
      geometry: { type: '', coordinates: [] },
    },
  ]);
  const [coordinates, setCoordinates] = useState([]);

  const handleFormSubmit = (formValues) => {
    let peopleArray = [];
    formValues.map(async (value) => {
      const coordinates = await fetchCoordinates({ zip: value.location });
      peopleArray.push({
        type: 'Feature',
        properties: {
          name: value.name,
          zip: value.location,
          city: coordinates.place_name,
        },
        geometry: {
          type: 'Point',
          coordinates: coordinates.center,
        },
      });
      setCoordinates(prev => [...prev, coordinates.center]);
    });
    setPeople(peopleArray);
  };

  return (
    <TravelContext.Provider value={{ people, handleFormSubmit }}>
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
