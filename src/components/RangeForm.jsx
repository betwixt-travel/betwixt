import React from 'react';
import styles from '../components/RangeForm.css';
import { useTravelContext } from '../context/TravelContext';

export default function RangeForm() {
  const { population, setPopulation, radius, setRadius, handleMidpoint } =
    useTravelContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMidpoint();
  };

  return (
    <form className={styles.slidecontainer} onSubmit={handleSubmit}>
      <input
        type="range"
        min="100000"
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
  );
}
