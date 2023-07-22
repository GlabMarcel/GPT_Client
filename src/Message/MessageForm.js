// MessageForm.js
import React from 'react';
import { TextField, Button, IconButton } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1em',
  },
  textField: {
    marginRight: '1em',
    width: '70%',
  },
});

const MessageForm = ({ newMessage, isListening, toggleListen, onNewMessageChange, onSendMessage }) => {
  const classes = useStyles();

  return (
    <form onSubmit={onSendMessage} className={classes.form}>
      <IconButton 
        color="secondary" 
        onClick={toggleListen}
      >
        {isListening ? <MicOffIcon /> : <MicIcon />}
      </IconButton>

      <TextField
        variant="outlined"
        className={classes.textField}
        value={newMessage}
        onChange={onNewMessageChange}
        placeholder="Type your message here..."
      />
      <Button variant="contained" color="primary" type="submit">
        Send
      </Button>
    </form>
  );
};

export default MessageForm;
