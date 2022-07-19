import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Home from './Pages/Home';
import Product from './Pages/Product';

class App extends React.Component {
  constructor() {
    super();

    this.showProducts = '';

    this.state = {
      cartItems: {},
      text: 'Seu carrinho está vazio',
    };
  }

  addToCart = ({ target }) => {
    const { name: id } = target;
    const { cartItems } = this.state;

    this.setState({
      cartItems: {
        ...cartItems,
        [id]: (cartItems[id] || 0) + 1,
      },
    });
  }

  decreaseQuantity = ({ target }) => {
    const { cartItems } = this.state;
    const { name: id } = target;

    const allProducts = { ...cartItems };
    if (allProducts[id] === 1) {
      return;
    }

    allProducts[id] -= 1;

    this.setState({
      cartItems: allProducts,
    });
  }

  getInfoFromHome = (info) => {
    this.showProducts = info;
  };

  render() {
    const { text, cartItems } = this.state;

    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ () => (<Home
            addToCart={ this.addToCart }
            getInfoFromHome={ this.getInfoFromHome }
          />) }
        />
        <Route
          path="/cart"
          render={ () => (Object.entries(cartItems).length === 0
            ? <h2 data-testid="shopping-cart-empty-message">{ text }</h2>
            : Object.entries(cartItems)
              .map(([id, quantity]) => (
                <Cart
                  key={ id }
                  id={ id }
                  quantity={ quantity }
                  addToCart={ this.addToCart }
                  decreaseQuantity={ this.decreaseQuantity }
                  showProducts={ this.showProducts }
                />))) }
        />
        <Route
          path="/product/:id"
          render={ (props) => <Product { ...props } addToCart={ this.addToCart } /> }
        />
        <Route path="/checkout" render={ (props) => <Checkout { ...props } /> } />
      </BrowserRouter>
    );
  }
}

export default App;
