import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useUser';
import { updateProfile } from '../../services/user';

export default function ProfileForm({ setIsEditing }) {
  const { user, updateUserState } = useAuth();
  const inputs = {
    home_zip: user?.home_zip || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
  };
  const { formState, handleChange } = useForm(inputs);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await updateProfile({ ...formState });
    updateUserState(resp);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Edit Your Profile</legend>
        <label htmlFor="first_name">
          First name:
          <input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="First name"
            value={formState.first_name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="last_name">
          Last name:
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Last name"
            value={formState.last_name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="home_zip">
          Zip-code:
          <input
            type="text"
            name="home_zip"
            id="home_zip"
            placeholder="Zip code"
            value={formState.home_zip}
            onChange={handleChange}
          />
        </label>
        <button>Save</button>
      </fieldset>
    </form>
  );
}
