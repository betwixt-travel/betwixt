import { useEffect, useState } from 'react';
import { fetchCoordinates } from '../services/maps';
import { fetchPlaces } from '../services/places';
import MapItem from '../components/Map/MapItem';
import { useTravelContext } from '../context/TravelContext';

export default function Results() {
  const { people } = useTravelContext();
  // const [finalArray, setFinalArray] = useState([]);

  if (!people) return null;

  useEffect(() => {
    // setFinalArray(peopleToGeoJSON(people));
    const wait = async () => {
      //await fetchPlaces({ lat: '45.0', long: '-120.0' });
      await fetchCoordinates({ zip: '98672' });
    };
    wait();
  }, [people]);

  console.log('people', people);
  // console.log('finalArray', finalArray);

  return (
    <div>
      Results
      <MapItem />
    </div>
  );
}
