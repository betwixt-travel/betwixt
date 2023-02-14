import React from 'react';
import { useState, useEffect } from 'react';
import ProfileForm from '../components/ProfileDetails/ProfileForm';
import { useAuth } from '../hooks/useUser';
import { deleteUserCity, getUserCities } from '../services/places';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import edit from '../assets/images/pencil.png';
import remove from '../assets/images/trash.png';
import styles from './Profile.css';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteHandler = async (id, location) => {
    await deleteUserCity(id);
    setCities((prev) => prev.filter((city) => id !== city.id));
    toast.success(`Successfully deleted your trip to ${location}.`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const usersTrips = await getUserCities();
      setCities(usersTrips);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profile}>
        <h1>
          Profile
          <span onClick={() => setIsEditing(!isEditing)}>
            <img className={styles.edit} src={edit} />
          </span>
        </h1>
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        {user.home_zip ? (
          <p>Default location: {user.home_zip}</p>
        ) : (
          <p>
            Looks like you don't have a default location set.{' '}
            <span onClick={() => setIsEditing(true)}>
              <span className={styles.underline}>Click here</span> to finish
              setting up your profile.
            </span>
          </p>
        )}
        {isEditing && <ProfileForm setIsEditing={setIsEditing} />}
      </div>
      <div className={styles.saved}>
        <h1>Saved Trips</h1>
        {loading ? (
          <div>loading...</div>
        ) : cities.length === 0 ? (
          <p>
            Looks like you haven't saved any trips, get out there and start
            looking!
          </p>
        ) : (
          cities.map(({ id, location, url }) => (
            <div key={id} className={styles.savedTrips}>
              {' '}
              <Link to={url}>
                <p>{location} </p>
              </Link>
              <span onClick={() => deleteHandler(id, location)}>
                <img className={styles.remove} src={remove} />
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
