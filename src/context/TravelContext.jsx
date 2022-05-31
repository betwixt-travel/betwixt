import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCoordinates } from '../services/maps';
import * as turf from '@turf/turf';
import { useHistory } from 'react-router-dom';

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
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const handleFormSubmit = async (formValues) => {
    setFormError('');
    const data = formValues.map((value) => {
      const promise = new Promise((resolve, reject) => {
        fetchCoordinates(value).then((result) =>
          resolve({ ...result, name: value.name })
        );
      });
      return promise;
    });
    console.log('data', data);
    const convertData = (array) => {
      const formatedData = array.map((value) => {
        const { geometry, place_name, text, name } = value;
        return {
          type: 'Feature',
          properties: {
            name,
            zip: text,
            city: place_name,
          },
          geometry,
        };
      });
    };

    Promise.all(data).then(convertData);
  };

  // const convertFormInput = async (formValues) => {
  //   let peopleArray = [];
  //   setFormError('');

  //   for (const value of formValues) {
  //     const fetchCoordsAndPush = async () => {
  //       const coordinates = await fetchCoordinates({ zip: value.location });
  //       if (coordinates === undefined) {
  //         console.log('hit');
  //         setFormError('Please enter a valid zipcode');
  //       } else {
  //         peopleArray.push({
  //           type: 'Feature',
  //           properties: {
  //             name: value.name,
  //             zip: value.location,
  //             city: coordinates.place_name,
  //           },
  //           geometry: {
  //             type: 'Point',
  //             coordinates: coordinates.center,
  //           },
  //         });

  //         setCoordinates((prev) => [...prev, coordinates.center]);
  //       }
  //     };
  //     fetchCoordsAndPush();
  //   }

  //   setLoading(false);
  //   return peopleArray;
  // };

  // const handleFormSubmit = async (formValues) => {
  //   const peopleArray = await convertFormInput(formValues);
  //   setPeople(peopleArray);
  //   if (!loading && formError === '') {
  //     history.push('/results');
  //   }
  // };

  useEffect(() => {
    if (!coordinates) return;
    if (coordinates.length === 2) {
      const point1 = turf.point(coordinates[0]);
      const point2 = turf.point(coordinates[1]);
      const midpoint = turf.midpoint(point1, point2);
      setMidpoint(midpoint);
    }
    if (coordinates.length > 2) {
      const features = turf.points([...coordinates]);
      const midpoint = turf.center(features);
      setMidpoint(midpoint);
    }
  }, [coordinates]);

  return (
    <TravelContext.Provider
      value={{
        people,
        handleFormSubmit,
        midpoint,
        formError,
        loading,
        setLoading,
      }}
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
