import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ResultsDetail() {
  const { city } = useParams();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  useEffect(() => {
    const coordinates = city.split('+');
    setLat(coordinates[0]);
    setLong(coordinates[1]);
    
  }, [city]);

  return (
    <>
      <p>lat: {lat}</p>
      <p>long: {long}</p>
    </>
  );
}
