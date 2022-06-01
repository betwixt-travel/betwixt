import { Link } from 'react-router-dom';
import MapItem from '../components/Map/MapItem';
import { useTravelContext } from '../context/TravelContext';

export default function Results() {
  const { cities, loading } = useTravelContext();
  
  if (loading) return <div>loading...</div>
  
  return (
    <div>
      <div>
        Results
        <ul>
          {cities.map((city) => (
            <li key={city.properties.id}>
              <Link
                to={`/results/${city.properties.latitude}+${city.properties.longitude}`}
              >
                {city.properties.name} - {city.properties.distance}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <MapItem />
    </div>
  );
}
