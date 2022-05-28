import { createContext, useContext, useState } from 'react';
import { fetchCoordinates } from '../services/maps';

export const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [people, setPeople] = useState([
    { name: '', location: '', lat: '', long: '' },
  ]);

  const peopleToGeoJSON = (array) => {
    console.log('array', array);
    const geoJSON = array.map((location) => {
      console.log('lat', location.lat);
      return {
        type: 'Feature',
        properties: {
          name: location.name,
          location: location.location,
        },
        geometry: {
          type: 'Point',
          coordinates: [+location.lat, +location.long],
        },
      };
    });
    console.log('geoJSON in form', geoJSON);
    return geoJSON;
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
