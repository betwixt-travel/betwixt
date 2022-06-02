import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useTravelContext } from '../context/TravelContext';
import MapItem from '../components/Map/MapItem';
import styles from './Results.css';
import RangeForm from '../components/RangeForm';

export default function Results() {
  const { cities, loading } = useTravelContext();
  const history = useHistory();

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.resultsContainer}>
        <RangeForm className={styles.rangeForm} />
        {cities.length < 1 ? (
          <div className={styles.noResults}>
            <p>Looks like there are no cities near this midpoint.</p>
            <button onClick={() => history.push('/')}>
              Click here to try again.
            </button>
          </div>
        ) : (
          <div className={styles.resultsList}>
            <ul>
              {cities.map((city) => (
                <li key={city.properties.id} className={styles.result}>
                  <Link
                    to={`/city?lat=${city.properties.latitude}&long=${city.properties.longitude}`}
                  >
                    <span>{city.properties.name}</span>
                    <span>-</span>
                    <span>{city.properties.distance}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.mapItemContainer}>
        <MapItem />
      </div>
    </div>
  );
}
