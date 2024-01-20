import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat =()=>{

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [partnerId, setPartnerId] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  // const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    newSocket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    newSocket.on('pairing', ({ partnerId }) => {
      setPartnerId(partnerId);
      setIsSearching(false);
      // Start the chat with partnerId
    });

    // newSocket.on('updateOnlineUsers', (users) => {
    //   setOnlineUsers(users);
    // });

    return () => newSocket.disconnect();
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    if (socket) {
      socket.emit('searchForPartner');
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('sendMessage',  {text: message, sender: socket.id } );
    }
  };

    return(
        <>
        <h1>this is the chat page</h1>
        {isSearching && <p>Searching for a partner...</p>}
        {!isSearching && partnerId && (
        <div style={{ height: '100vh',marginLeft: '1.25%' }}>
          <p>Connected with partner </p>
            <div style={{ marginBottom: '20px' }}>
              {messages.map((message, index) => {
                if (message.sender === socket.id) {
                  return (
                    <div key={index}>
                      <strong>You:</strong> {message.text}
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      <strong>Stranger:</strong> {message.text}
                    </div>
                  );
                }
              })}
            </div>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message and press Enter"
                style={{ width: '80%',height:'8%' }}
            />
        </div>
        )}
        {!isSearching && !partnerId && (
        <button onClick={handleSearch}>Search for a partner</button>
      )}
        </>
    );
};

export default Chat;