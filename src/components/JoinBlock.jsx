import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные');
    }
    const obj = {
      roomId,
      userName,
    };
    setIsLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
  };

  return (
    <div className="row col">
      <input
        className="form-control margin"
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        className="form-control margin"
        type="text"
        placeholder="Ваше имя"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Link className="link" onClick={onEnter} to={`/room?${roomId}`}>
        <button
          className="btn btn-outline-success margin"
          type="button"
          disabled={isLoading}
        >
          {isLoading ? 'Входим...' : 'Войти'}
        </button>
      </Link>
    </div>
  );
}

export default JoinBlock;
