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
      cartItems: [{ id: '' }],
      filter: [],
      text: 'Seu carrinho está vazio',
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

    return Object.entries(uniqueIds);
  }

  decreaseQuantity = ({ target }) => {
    const { cartItems } = this.state;
    const { name } = target;

    // const verifyItem = cartItems.filter(({ id }) => id === name).length;
    // console.log(verifyItem);
    const indexToRemove = cartItems.indexOf(cartItems.find(({ id }) => id === name));
    cartItems.splice(1, indexToRemove);
    this.setState({
      cartItems,
    }, () => {
      const newFilter = this.filterProductsIds();

      this.setState({
        filter: newFilter,
      });
    });
  }

  render() {
    const { filter, text } = this.state;

    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ (props) => <Home { ...props } addToCart={ this.addToCart } /> }
        />
        <Route
          path="/cart"
          render={ (props) => (filter.length === 0
            ? <h2 data-testid="shopping-cart-empty-message">{ text }</h2>
            : filter
              .map((el, index) => (
                <Cart
                  key={ index }
                  { ...props }
                  filter={ filter }
                  id={ el[0] }
                  quantity={ el[1] }
                  addToCart={ this.addToCart }
                  decreaseQuantity={ this.decreaseQuantity }
                />))) }
        />
        <Route
          path="/product/:id"
          render={ (props) => <Product { ...props } addToCart={ this.addToCart } /> }
        />
      </BrowserRouter>
    );
  }
}

export default App;
