import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Product from './Pages/Product';

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
        <Route
          path="/product/:id"
          render={ (props) => <Product { ...props } /> }
        />
      </BrowserRouter>
    );
  }
}

export default App;
