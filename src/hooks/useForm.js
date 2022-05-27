import { useState } from 'react';

export function useForm(inputs = {}) {
  const [formState, setFormState] = useState({ ...inputs });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log('formState', formState);

    setFormState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return { formState, handleChange };
}
