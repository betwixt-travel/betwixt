import { useEffect } from 'react';
import { fetchPlaces } from './services/places';
export default function App() {
  useEffect(() => {
    const wait = async () => {
      await fetchPlaces({ lat: '45.0', long: '-120.0' });
    };
    wait();
  }, []);
  return <h1>Hello World!</h1>;
}
