import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useTravelContext } from '../context/TravelContext';
import MapItem from '../components/Map/MapItem';
import styles from './Results.css';

export default function Results() {
  const {
    cities,
    loading,
    population,
    setPopulation,
    radius,
    setRadius,
    getCities,
    handleMidpoint,
  } = useTravelContext();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMidpoint();
  };

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
          <>
            <form className={styles.slidecontainer} onSubmit={handleSubmit}>
              <input
                type="range"
                min="10000"
                max="500000"
                defaultValue="100000"
                step="10000"
                //className={styles.slider}
                id="populationSlider"
                onInput={(e) => setPopulation(e.target.value)}
              />
              <p>Population: {population}</p>
              <input
                type="range"
                min="50"
                max="500"
                defaultValue="500"
                step="25"
                //className={styles.slider}
                id="radiusSlider"
                onInput={(e) => setRadius(e.target.value)}
              />
              <p>Radius: {radius} miles</p>
              <button>Update search</button>
            </form>
            <ul className={styles.resultsList}>
              {cities.map((city) => (
                <li key={city.properties.id}>
                  <Link
                    to={`/city?lat=${city.properties.latitude}&long=${city.properties.longitude}`}
                  >
                    {city.properties.name} - {city.properties.distance}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className={styles.mapItemContainer}>
        <MapItem />
      </div>
    </div>
  );
}
