import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Home } />
    </BrowserRouter>
  );
}

export default App;
