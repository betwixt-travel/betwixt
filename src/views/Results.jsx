import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import MapItem from '../components/Map/MapItem';
import { useTravelContext } from '../context/TravelContext';

export default function Results() {
  const { cities, loading } = useTravelContext();
  const history = useHistory();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        Results
        {cities.length < 1 ? (
          <>
            <p>Looks like there are no cities near this midpoint.</p>
            <button onClick={() => history.push('/')}>
              Click here to try again.
            </button>
          </>
        ) : (
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
        )}
      </div>
      <MapItem />
    </div>
  );
}
