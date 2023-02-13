import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTravelContext } from '../../context/TravelContext';
import { useAuth } from '../../hooks/useUser';
import styles from './TravelersForm.css';

export default function TravelersIIntakeForm() {
  const { people, handleFormSubmit, formError, loading } = useTravelContext();
  const { user } = useAuth();
  const history = useHistory();

  const [formValues, setFormValues] = useState([
    { name: user?.first_name || '', location: user?.home_zip || '' },
    { name: '', location: '' },
  ]);
  if (!people) return;
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: '', location: '' }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleFormSubmit(formValues);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.travelersForm}>
        <p>Enter zip codes* to figure out where to meet up:</p>
        {formValues.map((element, index) => (
          <div className={styles.formSection} key={index}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder={`Name for Traveler ${index + 1}`}
              value={element.name || ''}
              onChange={(e) => handleChange(index, e)}
            />
            <label>Zip code:</label>
            <input
              type="text"
              name="location"
              placeholder={`Zip for Traveler ${index + 1}`}
              value={element.location || ''}
              onChange={(e) => handleChange(index, e)}
            />
            {index > 1 ? (
              <span
                className={styles.removeButton}
                onClick={() => removeFormFields(index)}
              >
                —
              </span>
            ) : null}
          </div>
        ))}
        <div className={styles.buttonSection}>
          <span className={styles.addButton} onClick={() => addFormFields()}>
            +
          </span>
          <button className="button submit" type="submit">
            Let's go!
          </button>
          {formError && <p>{formError}</p>}
        </div>
        <p className={styles.disclaimer}>*US only, for now</p>
      </form>
    </>
  );
}
