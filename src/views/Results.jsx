import { useEffect, useState } from 'react';
import MapItem from '../components/Map/MapItem';
import { useTravelContext } from '../context/TravelContext';

export default function Results() {
  const { cities } = useTravelContext();
  const [sortedCities, setSortedCities] = useState([]);
  
  // useEffect(() => {
  //   setSortedCities(cityArray.sort((a, b) => a.properties.distance > b.properties.distance ? 1 : -1));
  // }, []);

  return (
    <div>
      Results
      <ul>
        {cities.map((city) => (
          <li key={city.properties.id}>{city.properties.name} - {city.properties.distance}</li>
        ))}
      </ul>
      <MapItem />
    </div>
  );
}
