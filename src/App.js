// App.js
import React, { useState, useRef } from 'react';
import { Paper, CircularProgress, Typography, Button } from '@material-ui/core'; // import Button
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import MessageList from './Message/MessageList';
import MessageForm from './Message/MessageForm';
import { sendMessageToApi } from './API/API';
import SettingsSidebar from './Settings/SettingsSidebar'; // import SettingsSidebar
import './App.css';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: pink,
  },
});

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  chatContainer: {
    flex: '1',
    overflow: 'auto',
    padding: '1em',
    marginBottom: '1em',
  },
  typingIndicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
});

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // New state for error
  const [isSidebarOpen, setSidebarOpen] = useState(false); // New state for sidebar
  const messagesEndRef = useRef(null);
  const classes = useStyles();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      setIsLoading(true);
      setMessages([...messages, { sender: 'user', content: newMessage, timestamp: new Date() }]);
      setNewMessage('');

      // Make API request
      try {
        const response = await sendMessageToApi(newMessage);
        
        // Add the response from the API to the messages
        setMessages(prevMessages => [...prevMessages, { sender: 'assistant', content: response, timestamp: new Date() }]);
      } catch (error) {
        console.error('Failed to fetch the response from the API:', error);
        setError('Failed to send message. Please try again later.'); // Set error message
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleListen = () => {
    setIsListening((prevIsListening) => !prevIsListening);
  };

  return (
    <ThemeProvider theme={theme}>
      {!isSidebarOpen && (
        <Button className="open-settings-button" onClick={handleOpenSidebar}>
          Open Settings
        </Button>
      )}
      <SettingsSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <Paper className={classes.root}>
        <div className={classes.chatContainer}>
          <MessageList messages={messages} />
          {isLoading && (
            <div className={classes.typingIndicator}>
              <CircularProgress size={20} />
              <Typography variant="subtitle1">Typing...</Typography>
            </div>
          )}
          {error && <div className={classes.error}>{error}</div>} {/* Display error message */}
          <div ref={messagesEndRef} />
        </div>
        <MessageForm
          newMessage={newMessage}
          isListening={isListening}
          toggleListen={toggleListen}
          onNewMessageChange={handleNewMessageChange}
          onSendMessage={sendMessage}
        />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
