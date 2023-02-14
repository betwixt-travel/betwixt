import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useUser';
import { updateUser } from '../../services/user';
import styles from './ProfileForm.css';
import toast from 'react-hot-toast';

export default function ProfileForm({ setIsEditing }) {
  const { user, updateUserState } = useAuth();
  const inputs = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    homeZip: user?.homeZip || '',
  };
  const { formState, handleChange } = useForm(inputs);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('formState', formState);
    const resp = await updateUser({ ...formState });
    console.log('resp', resp);
    updateUserState(resp);
    setIsEditing(false);
    toast.success('Successfully updated your profile!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className={styles.profileForm}>
        <legend>Edit Your Profile</legend>
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First name"
          value={formState.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last name"
          value={formState.lastName}
          onChange={handleChange}
        />
        <label htmlFor="homeZip">Zip-code:</label>
        <input
          type="text"
          name="homeZip"
          id="homeZip"
          placeholder="Zip code"
          value={formState.homeZip}
          onChange={handleChange}
        />
        <button>Save</button>
      </fieldset>
    </form>
  );
}
