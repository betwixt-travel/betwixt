import { useEffect } from 'react';
import { fetchCoordinates } from '../services/maps';
import { fetchPlaces } from '../services/places';

export default function Results() {
  useEffect(() => {
    const wait = async () => {
      //await fetchPlaces({ lat: '45.0', long: '-120.0' });
      await fetchCoordinates({ zip: '98672' });
    };
    wait();
  }, []);

  return <div>Results</div>;
}
