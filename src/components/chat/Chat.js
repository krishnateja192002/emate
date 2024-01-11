import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat =()=>{

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    newSocket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // newSocket.on('updateOnlineUsers', (users) => {
    //   setOnlineUsers(users);
    // });

    return () => newSocket.close();
  }, []);


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
        <div style={{ height: '100vh',marginLeft: '1.25%' }}>
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
        </>
    );
};

export default Chat;