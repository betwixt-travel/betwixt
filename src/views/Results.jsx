import { Link } from 'react-router-dom';
import MapItem from '../components/Map/MapItem';
import { useTravelContext } from '../context/TravelContext';

export default function Results() {
  const { cities } = useTravelContext();

  return (
    <div>
      <div>
        Results
        <ul>
          {cities.map((city) => (
            <li key={city.properties.id}>
              <Link to={`/results/lat=${city.properties.latitude}&long=${city.properties.longitude}`}>
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
