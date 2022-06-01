import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTravelContext } from '../context/TravelContext';
import { fetchCity } from '../services/places';

export default function ResultsDetail() {
  const { city } = useParams();
  const { saveHandler } = useTravelContext();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [cityInfo, setCityInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const coordinates = city.split('+');
    setLat(coordinates[0]);
    setLong(coordinates[1]);
    const getCity = async () => {
      const cityData = await fetchCity({
        lat: coordinates[0],
        long: coordinates[1],
      });
      setCityInfo(cityData[0]);
      setLoading(false);
    };
    getCity();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      {/* {loading && <p>Loading...</p>} */}
      <h2>
        {cityInfo.city}, {cityInfo.region}
      </h2>
      <p>{cityInfo.country}</p>
      <p>Population: {cityInfo.population}</p>
      <button onClick={() => saveHandler()}>Save this trip</button>
    </>
  );
}
