import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCity } from '../services/places';

export default function ResultsDetail() {
  const { city } = useParams();
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
  console.log('cityInfo', cityInfo);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      {/* {loading && <p>Loading...</p>} */}
      <h2>
        {cityInfo.city}, {cityInfo.region}
      </h2>
      <p>{cityInfo.country}</p>
      <p>Population: {cityInfo.population}</p>
    </>
  );
}
