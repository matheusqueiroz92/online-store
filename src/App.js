import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Product from './Pages/Product';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cartItems: '',
    };
  }

  addToCart = ({ target }) => {
    const { name } = target;
    this.setState({
      cartItems: name,
    });
  }

  render() {
    const { cartItems } = this.state;
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ (props) => <Home { ...props } addToCart={ this.addToCart } /> }
        />
        <Route
          path="/cart"
          render={ (props) => <Cart { ...props } cartItems={ cartItems } /> }
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
