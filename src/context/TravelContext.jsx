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

  const convertFormInput = async (formValues) => {
    let peopleArray = [];
    for (const value of formValues) {
      const fetchCoordsAndPush = async () => {
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
        setCoordinates((prev) => [...prev, coordinates.center]);
      };
      fetchCoordsAndPush();
    }

    return peopleArray;
  };

  const handleFormSubmit = async (formValues) => {
    const peopleArray = await convertFormInput(formValues);
    setPeople(peopleArray);
  };

  useEffect(() => {
    if (!coordinates) return;
    console.log('coordinates', coordinates);
    if (coordinates.length === 2) {
      const point1 = turf.point(coordinates[0]);
      const point2 = turf.point(coordinates[1]);
      const midpoint = turf.midpoint(point1, point2);
      setMidpoint(midpoint);
    } else if (coordinates.length > 2) {
      const array = [...coordinates];
      const features = turf.points(array);
      const midpoint = turf.center(features);
      setMidpoint(midpoint);
    } else {
    }
  }, [coordinates]);

  return (
    <TravelContext.Provider value={{ people, handleFormSubmit, midpoint }}>
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
