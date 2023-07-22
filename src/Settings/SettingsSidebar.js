// SettingsSidebar.js
import React, { useState } from 'react';

const SettingsSidebar = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('OPENAI_API_KEY', apiKey);
  };

  return (
    <div className={`settings-sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={onClose}>Close</button>
      <form onSubmit={handleSubmit}>
        <label>
          OpenAI API Key:
          <input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} />
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default SettingsSidebar;
