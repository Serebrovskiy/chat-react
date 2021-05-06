
import React, { useEffect, useReducer } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import socket from "./socket";
import reducer from './reducer';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
    date: '01.01.2021'
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    });
    //отправляем socket запрос на бекэнд
    socket.emit('ROOM:JOIN', obj);
    //получаем актуальные данные по пользователям и сообщениям
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message
    })
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/">
          <JoinBlock onLogin={onLogin} />
        </Route>
        <Route exact path="/room">
          <Chat {...state} onAddMessage={addMessage} />
        </Route>
      </Switch>
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </div>
  );
}

export default App;
