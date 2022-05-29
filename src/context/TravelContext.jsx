import { createContext, useContext, useState } from 'react';
import { fetchCoordinates } from '../services/maps';

export const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [people, setPeople] = useState([
    {
      type: '',
      properties: { name: '', location: '' },
      geometry: { type: '', coordinates: [] },
    },
  ]);
  // const [geoJSON, setGeoJSON] = useState([]);

  // const peopleToGeoJSON = (array) => {
  //   console.log('array', array);
  //   let newArray = [];
  //   array.map(({ location }) => {
  //     newArray.push({
  //       lat: 'hello',
  //       // type: 'Feature',
  //       // properties: {
  //       //   name: location.name,
  //       //   location: location.location,
  //       // },
  //       // geometry: {
  //       //   type: 'Point',
  //       //   coordinates: [+location.lat, +location.long],
  //       // },
  //     });
  //   });
  //   console.log('newArray', newArray);
  //   // console.log('geoJSON in form', geoJSON);
  //   setGeoJSON(newArray);
  // };
  // console.log('geoJSON', geoJSON);

  const handleFormSubmit = (formValues) => {
    console.log('formValues', formValues);
    let peopleArray = [];
    formValues.map(async (value) => {
      const coordinates = await fetchCoordinates({ zip: value.location });
      console.log('coordinates', coordinates);
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
        // name: value.name,
        // location: value.location,
        // lat: coordinates[0],
        // long: coordinates[1],
      });
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
