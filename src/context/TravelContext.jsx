import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCoordinates } from '../services/maps';
import * as turf from '@turf/turf';
import { fetchPlaces, saveCity } from '../services/places';
import { useHistory } from 'react-router-dom';
import { getUser } from '../services/user';
import toast from 'react-hot-toast';

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
  const [cities, setCities] = useState([]);
  const history = useHistory();
  const [bounds, setBounds] = useState([]);

  const handleFormSubmit = async (formValues) => {
    setFormError('');
    setCoordinates([]);
    setMidpoint([]);
    setBounds([]);

    const data = formValues.map((value) => {
      const promise = new Promise((resolve, reject) => {
        fetchCoordinates(value).then((result) =>
          resolve({ ...result, name: value.name })
        );
      });
      return promise;
    });
    const convertData = (array) => {
      try {
        const formattedData = array.map((value) => {
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
        setFormError('Invalid zip code');
      }
    };

    Promise.all(data).then(convertData);
  };

  useEffect(() => {
    if (!coordinates) return;
    let latArray = [];
    let longArray = [];

    coordinates.map((coord) => {
      latArray.push(coord[0]);
      longArray.push(coord[1]);
    });

    latArray.sort((a, b) => {
      return a - b;
    });
    longArray.sort((a, b) => {
      return a - b;
    });
    setBounds([
      latArray[0],
      longArray[0],
      latArray[latArray.length - 1],
      longArray[longArray.length - 1],
    ]);

    // sw corner lat < and long >  ne lat > long <+
  }, [coordinates]);

  const getCities = async (midpoint) => {
    let cityArray = [];
    const [long, lat] = midpoint.geometry.coordinates;
    const cityData = await fetchPlaces({ lat, long });
    for (let city of cityData) {
      cityArray.push({
        type: 'Feature',
        properties: {
          id: city.id,
          name: city.name,
          state: city.regionCode,
          pop: city.population,
          distance: city.distance,
          latitude: city.latitude,
          longitude: city.longitude,
        },
        geometry: {
          type: 'Point',
          coordinates: [city.longitude, city.latitude],
        },
      });
    }
    setCities(
      cityArray.sort((a, b) =>
        a.properties.distance > b.properties.distance ? 1 : -1
      )
    );
  };

  useEffect(() => {
    if (!coordinates) return;

    const handleMidpoint = async () => {
      if (coordinates.length === 2) {
        const point1 = turf.point(coordinates[0]);
        const point2 = turf.point(coordinates[1]);
        const midpoint = turf.midpoint(point1, point2);
        await getCities(midpoint);
        setMidpoint(midpoint);
      }
      if (coordinates.length > 2) {
        const array = [...coordinates];
        const features = turf.points(array);
        const midpoint = turf.center(features);
        await getCities(midpoint);
        setMidpoint(midpoint);
      }
    };
    handleMidpoint();
  }, [coordinates]);

  const saveHandler = async ({ location, url }) => {
    const city = { location, creator_id: getUser().id, url };
    await saveCity(city);
    history.push('/results');
    toast.success(`Successfully added ${location} to your saved trips.`);
  };

  return (
    <TravelContext.Provider
      value={{
        people,
        handleFormSubmit,
        midpoint,
        formError,
        loading,
        setLoading,
        cities,
        saveHandler,
        bounds,
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
