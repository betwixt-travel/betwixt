import React from 'react';
import TravelersIIntakeForm from '../../components/TravelersForm/TravelersIIntakeForm';
import styles from './Home.css'

export default function Home() {
  return (
    <>
      <div className={styles.homeBackground}>
        <TravelersIIntakeForm />
      </div>
    </>
  );
}
