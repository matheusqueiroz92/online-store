import PropTypes from 'prop-types';
import React from 'react';
import { getProductById } from '../services/api';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      productsIds: [],
    };
  }

  componentDidMount() {
    this.handleCartItems();
  }

  handleCartItems = async () => {
    const { id } = this.props;
    const product = await getProductById(id);

    this.setState({
      productsIds: product,
    });
  }

  render() {
    const { productsIds } = this.state;
    const { id, quantity } = this.props;

    return (
      <div>
        <div key={ id }>
          <h2 data-testid="shopping-cart-product-name">{ productsIds.title }</h2>
          <img src={ productsIds.thumbnail } alt={ id } />
          <h3>{ `Preço por unidade: ${productsIds.price}` }</h3>
          <h3
            data-testid="shopping-cart-product-quantity"
          >
            { `Quantidade: ${quantity}` }
          </h3>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.any,
}.isRequired;

export default Cart;
