import './App.css';
import React from 'react';
import {useState} from 'react';
import Header from '../../Header/Header.jsx';
import TaskList from '../../TaskList/TaskList.jsx';
import axios from 'axios';

function App () {
  
  return (
    <div>
      <Header />
      <TaskList />
    </div>
  );

}

export default App;