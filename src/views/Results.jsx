import { useEffect } from 'react';
import { fetchPlaces } from '../services/places';

export default function Results() {
  useEffect(() => {
    const wait = async () => {
      await fetchPlaces({ lat: '45.0', long: '-120.0' });
    };
    wait();
  }, []);

  return <div>Results</div>;
}
