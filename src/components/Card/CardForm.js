import React from 'react';

const CardForm = ({ value, onChange, onCancel, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CardForm;
