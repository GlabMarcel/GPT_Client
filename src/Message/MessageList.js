// MessageList.js
import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'; // Import PropTypes

const useStyles = makeStyles({
  message: {
    margin: '1em 0',
  },
  user: {
    color: 'green',
    textAlign: 'right',
  },
  assistant: {
    color: 'red',
    textAlign: 'left',
  },
});

const MessageList = ({ messages }) => {
  const classes = useStyles();

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const timeDifference = now - timestamp; // difference in milliseconds

    if (timeDifference < 60 * 1000) {
      return 'Just now';
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
      return 'Today at ' + timestamp.toLocaleTimeString();
    } else {
      return timestamp.toLocaleString();
    }
  };

  return messages.map((message, index) => (
    <div key={index} className={classes.message}>
      <Typography variant="subtitle1" className={classes[message.sender]}>
        <strong>{message.sender}</strong>: {message.content}
      </Typography>
      <Typography variant="caption" className={classes[message.sender]}>
        {formatTimestamp(message.timestamp)}
      </Typography>
      <Divider />
    </div>
  ));
};

// Add PropTypes
MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    sender: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
  })).isRequired,
};

export default MessageList;
