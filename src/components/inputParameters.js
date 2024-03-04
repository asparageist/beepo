import React, { useEffect, useState } from 'react';

function InputParameters({ setParameters }) {
  const [personality, setPersonality] = useState('a magic squirrel named Beepo. I am a 4 year old named Cooper.');
  const [restrictions, setRestrictions] = useState('Anything above a PG rating, defer to parental guidance. Be brief in your response.');
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
          placeholder="a magic squirrel named Beepo. I am a 4 year old named Cooper."
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
          placeholder="Anything above a PG rating, defer to parental guidance. Be brief in your response."
          size="100"
        />
      </label>
      <br />
      <button type="submit">Set Parameters</button>
      <p>{formattedParameters}</p>
    </form>
  );
}

export default InputParameters;