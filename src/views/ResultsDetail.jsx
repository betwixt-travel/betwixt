import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTravelContext } from '../context/TravelContext';
import { useAuth } from '../hooks/useUser';
import { fetchImages } from '../services/images';
import { fetchCity } from '../services/places';
import Styles from '../views/ResultsDetails.css';

export default function ResultsDetail() {
  const { user } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lat = params.get('lat');
  const long = params.get('long');
  const history = useHistory();
  const { saveHandler } = useTravelContext();
  const [cityInfo, setCityInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getCity = async () => {
      const cityData = await fetchCity({
        lat,
        long,
      });
      setCityInfo(cityData[0]);
    };
    getCity();
  }, [lat, long]);

  useEffect(() => {
    if (!cityInfo) return;
    const fetchImagesData = async () => {
      const search = `${cityInfo.city}-${cityInfo.region}`;
      const results = await fetchImages(search);
      setImages(results.results);
      setLoading(false);
    };
    fetchImagesData();
  }, [cityInfo]);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <div>
        <h2>
          {cityInfo.city}, {cityInfo.region}
        </h2>
        <p>{cityInfo.country}</p>
        <p>Population: {cityInfo.population}</p>
        {user.email ? (
          <button
            onClick={() =>
              saveHandler({
                location: cityInfo.city,
                url: location.pathname + location.search,
              })
            }
          >
            Save this trip
          </button>
        ) : (
          <button onClick={() => history.push('/login')}>Save this trip</button>
        )}
      </div>
      <div className={Styles.cardList}>
        {images.map((image) => (
          <div className={Styles.card} key={image.id}>
            <img
              className={Styles.cardImage}
              alt={image.alt_description}
              src={image.urls.full}
              width="50%"
              height="50%"
            ></img>
          </div>
        ))}
      </div>
    </>
  );
}
