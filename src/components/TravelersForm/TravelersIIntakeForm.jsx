import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTravelContext } from '../../context/TravelContext';

export default function TravelersIIntakeForm() {
  const { people, handleFormSubmit, formError, loading } = useTravelContext();
  const history = useHistory();

  const [formValues, setFormValues] = useState([
    { name: '', location: '' },
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

    // TODO: Add function to submit button
  };
  console.log('formError', formError);

  return (
    <form onSubmit={handleSubmit}>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          Note: Zipcodes only from USA.
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={element.name || ''}
            onChange={(e) => handleChange(index, e)}
          />
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={element.location || ''}
            onChange={(e) => handleChange(index, e)}
          />
          {index > 1 ? (
            <button
              type="button"
              className="button remove"
              onClick={() => removeFormFields(index)}
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}
      <div className="button-section">
        <button
          className="button add"
          type="button"
          onClick={() => addFormFields()}
        >
          Add
        </button>
        <button className="button submit" type="submit">
          Submit
        </button>
        {formError && <p>{formError}</p>}
      </div>
    </form>
  );
}
