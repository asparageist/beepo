import React from 'react';
import { useApp } from '../context/AppContext';

function InputParameters() {
  const { 
    personality, 
    setPersonality, 
    restrictions, 
    setRestrictions 
  } = useApp();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="hidden" onSubmit={handleSubmit}>
      <label>
        Personality: 
        <br />
        <input className="hidden"
          type="text"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          size="100"
        />
      </label>
      <br />
      <label>
        <br />
        Restrictions: 
        <br />
        <input className="hidden"
          type="text"
          value={restrictions}
          onChange={(e) => setRestrictions(e.target.value)}
          size="100"
        />
      </label>
      <br />
      <p>You are {personality} {restrictions}</p>
    </form>
  );
}

export default InputParameters;