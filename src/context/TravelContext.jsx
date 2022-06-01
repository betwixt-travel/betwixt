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
    setCoordinates([]);

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
      try {
        const formattedData = array.map((value) => {
          console.log('value', value);
          if (value.geometry === undefined) throw new Error('invalid zip');
          const { geometry, place_name, text, name } = value;
          setCoordinates((prev) => [...prev, geometry.coordinates]);
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
        setPeople(formattedData);
        setLoading(false);
        history.push('/results');
      } catch (error) {
        console.log('error', error);
        setFormError('Invalid zip code');
      }
    };

    Promise.all(data).then(convertData);
  };

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
