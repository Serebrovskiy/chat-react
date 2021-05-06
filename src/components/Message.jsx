import React from 'react';
import './Chat.css';

function Message({ message }) {
  return (
    <div className="message">
      <p className="message-text">{message.text}</p>
      <div>
        <span className="message-name">{message.userName} | </span>
        <span className="message-name">{message.date}</span>
      </div>
    </div>
  );
}

export default Message;
