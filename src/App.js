import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Cart from './Pages/Cart';
import Home from './Pages/Home';

class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     cart: [],
  //   };
  // }

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route
          path="/cart"
          render={ (props) => <Cart { ...props } /> }
        />

      </BrowserRouter>
    );
  }
}

export default App;
