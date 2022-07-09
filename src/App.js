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
      cartItems: [{
        id: '',
      }],
      filter: [],
    };
  }

  addToCart = ({ target }) => {
    const { name } = target;
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, { id: name }],
    }), () => {
      const filterProducts = this.filterProductsIds();

      this.setState({
        filter: filterProducts,
      });
    });
  }

  filterProductsIds = () => {
    const { cartItems } = this.state;
    const uniqueIds = {};

    cartItems.slice(1).forEach(({ id }) => {
      uniqueIds[id] = (uniqueIds[id] || 0) + 1;
    });
    // console.log(Object.entries(uniqueIds).map((id) => console.log(id[0], id[1])));
    return Object.entries(uniqueIds);
  }

  render() {
    const { filter } = this.state;

    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ (props) => <Home { ...props } addToCart={ this.addToCart } /> }
        />
        <Route
          path="/cart"
          render={ (props) => <Cart { ...props } filter={ filter } /> }
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
