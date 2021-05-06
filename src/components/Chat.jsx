import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import socket from '../socket';
import './Chat.css';
import Message from './Message';

function Chat({ users, messages, userName, date, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = useState('');
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    if (roomId && messageValue) {
      socket.emit('ROOM:NEW_MESSAGE', {
        userName,
        roomId,
        text: messageValue,
        date,
      });
      onAddMessage({
        userName,
        text: messageValue,
        date: new Date().toLocaleTimeString(),
      });
      setMessageValue('');
    }
  };

  React.useEffect(() => {
    messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <hr />
        <b>Online ({users.length})</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
        <hr />
        <Link to="/" className="chat-text">
          Выйти
        </Link>
      </div>
      <div className="chat-message">
        <div className="messages" ref={messagesRef}>
          {messages.map((message, index) => (
            <Message message={message} key={index} />
            // <div className="message">
            //   <p className="message-text">{message.text}</p>
            //   <div>
            //     <span className="message-name">{message.userName} | </span>
            //     <span className="message-name">{message.date}</span>
            //   </div>
            // </div>
          ))}
        </div>
        <form>
          <textarea
            className="form-control"
            rows="3"
            value={messageValue}
            onChange={(e) => {
              setMessageValue(e.target.value);
            }}
          ></textarea>
          <button type="button" className="btn" onClick={onSendMessage}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
