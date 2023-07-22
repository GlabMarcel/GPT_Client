// SettingsSidebar.js
import React, { useState } from 'react';
import { IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';


const SettingsSidebar = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('OPENAI_API_KEY', apiKey);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <IconButton onClick={onClose} style={{ color: 'black', position: 'absolute', left: 0, top: '50%' }}>
        <ChevronLeftIcon />
          </IconButton>
      <Divider />
      <List>
        {['API Key', 'Model'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SettingsSidebar;
