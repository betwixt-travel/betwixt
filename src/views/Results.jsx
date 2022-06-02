import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useTravelContext } from '../context/TravelContext';
import MapItem from '../components/Map/MapItem';
import styles from './Results.css';

export default function Results() {
  const { cities, loading } = useTravelContext();
  const history = useHistory();

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.resultsContainer}>
        {cities.length < 1 ? (
          <>
            <p>Looks like there are no cities near this midpoint.</p>
            <button onClick={() => history.push('/')}>
              Click here to try again.
            </button>
          </>
        ) : (
          <ul className={styles.resultsList}>
            {cities.map((city) => (
              <li key={city.properties.id} className={styles.result}>
                <Link
                  to={`/city?lat=${city.properties.latitude}&long=${city.properties.longitude}`}
                >
                  {city.properties.name} - {city.properties.distance}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.mapItemContainer}>
        <MapItem />
      </div>
    </div>
  );
}
