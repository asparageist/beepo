import React, { useEffect, useState } from 'react';

function InputParameters({ setParameters }) {
  const [personality, setPersonality] = useState('a magic squirrel named Beepo.');
  const [restrictions, setRestrictions] = useState('Be whimsical but brief in your response. Treat me as though I am a 4 year old named Cooper.');
  const [formattedParameters, setFormattedParameters] = useState('');

  useEffect(() => {
    const newFormattedParameters = `You are ${personality} ${restrictions}`;
    setFormattedParameters(newFormattedParameters);
    setParameters(newFormattedParameters);
  }, [personality, restrictions, setParameters]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Personality: 
        <br />
        <input 
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
        <input 
          type="text"
          value={restrictions}
          onChange={(e) => setRestrictions(e.target.value)}
          size="100"
        />
      </label>
      <br />
      <p>{formattedParameters}</p>
    </form>
  );
}

export default InputParameters;