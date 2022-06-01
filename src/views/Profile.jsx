import React from 'react';
import { useState, useEffect } from 'react';
import ProfileForm from '../components/ProfileDetails/ProfileForm';
import { useAuth } from '../hooks/useUser';
import { getUserCities } from '../services/places';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

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
        ) : (
          cities.map(({ id, location }) => <h3 key={id}>{location}</h3>)
        )}
      </div>
    </div>
  );
}
