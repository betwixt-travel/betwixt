import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCoordinates } from '../services/maps';
import * as turf from '@turf/turf';

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
  const [midpoint, setMidpoint] = useState([]);

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

  useEffect(()=> {
    if (!coordinates) return;
    console.log('coordinates', coordinates);
    if (coordinates.length === 2) {
      console.log('coordinates', coordinates);
      const point1 = turf.point(coordinates[0]);
      const point2 = turf.point(coordinates[1]);
      const midpoint = turf.midpoint(point1, point2);
      console.log('midpoint', midpoint);
      setMidpoint(midpoint);
    } else {
      console.log('oops')
    }
  }, [people]);

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
