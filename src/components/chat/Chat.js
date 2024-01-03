import React, {useState} from "react";

const Chat =()=>{

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setMessages([...messages, `stranger: ${inputText}`]);
      setInputText('');
    }
  };

    return(
        <>
        <h1>this is the chat page</h1>
        <div style={{ height: '100vh',marginLeft: '1.25%' }}>
            <div style={{ marginBottom: '20px' }}>
                {messages.map((message, index) => (
                <div key={index}>{message}</div>
                ))}
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