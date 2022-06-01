import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTravelContext } from '../context/TravelContext';
import { fetchImages } from '../services/images';
import { fetchCity } from '../services/places';
import Styles from '../views/ResultsDetails.css';

export default function ResultsDetail() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lat = params.get('lat');
  const long = params.get('long');
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
        <button onClick={() => saveHandler()}>Save this trip</button>
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
