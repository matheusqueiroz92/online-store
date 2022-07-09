import PropTypes from 'prop-types';
import React from 'react';
import { getProductById } from '../services/api';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      productsIds: '',
      quantity: [],
    };
  }

  componentDidMount() {
    this.handleCartItems();
  }

  handleCartItems = async () => {
    const { filter } = this.props;

    filter.forEach(async (el) => {
      const itemId = el[0];
      const quantityItems = el[1];
      console.log(itemId, quantityItems);
      const product = await getProductById(itemId);

      this.setState((prevState) => ({
        productsIds: [...prevState.productsIds, product],
      }), () => {
        this.setState({
          quantity: quantityItems,
        });
      });
    });
  }

  render() {
    const { productsIds, quantity } = this.state;

    return (
      <div>
        {!productsIds
          ? (
            <h2 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h2>
          )
          : (
            productsIds.map(({ title, price, thumbnail }, index) => (
              <div key={ index }>
                <h2 data-testid="shopping-cart-product-name">{ title }</h2>
                <img src={ thumbnail } alt={ title } />
                <h3>{ price }</h3>
                <h3 data-testid="shopping-cart-product-quantity">{ quantity }</h3>
              </div>
            )))}
      </div>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.any,
}.isRequired;

export default Cart;
