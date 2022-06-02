import React from 'react';
import { useState, useEffect } from 'react';
import ProfileForm from '../components/ProfileDetails/ProfileForm';
import { useAuth } from '../hooks/useUser';
import { deleteUserCity, getUserCities } from '../services/places';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

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
    <div>
      <div className="left">
        <h1>
          Profile <span onClick={() => setIsEditing(true)}>✏️</span>
        </h1>
        <h3>
          {user.first_name} {user.last_name}
        </h3>
        {user.home_zip ? (
          <p>Default location: {user.home_zip}</p>
        ) : (
          <p>
            Looks like you don't have a default location set.{' '}
            <span onClick={() => setIsEditing(true)}>
              Click here to finish setting up your profile.
            </span>
          </p>
        )}
        {isEditing && <ProfileForm setIsEditing={setIsEditing} />}
      </div>
      <div className="right">
        <h1>Saved Trips</h1>
        {loading ? (
          <div>loading...</div>
        ) : cities.length === 0 ? (
          <div>
            Looks like you haven't saved any trips, get out there and start
            looking!
          </div>
        ) : (
          cities.map(({ id, location, url }) => (
            <div key={id}>
              {' '}
              <Link to={url}>
                <h3>
                  {location}{' '}
                  <span onClick={() => deleteHandler(id, location)}>❌</span>
                </h3>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
