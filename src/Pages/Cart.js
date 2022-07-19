import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

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

  handleCartItems = () => {
    const { showProducts, id } = this.props;
    const targetProduct = showProducts.find((el) => el.id === id);

    this.setState({
      productsIds: targetProduct,
    });
  }

  render() {
    const { productsIds } = this.state;
    const { id, quantity, addToCart, decreaseQuantity } = this.props;

    return (
      <div>
        <Link to="/checkout">
          <button
            type="button"
            data-testid="checkout-products"
          >
            Finalizar Compra
          </button>
        </Link>
        <div key={ id }>
          <h2 data-testid="shopping-cart-product-name">{ productsIds.title }</h2>
          <img src={ productsIds.thumbnail } alt={ id } />
          <h3>{ `Preço por unidade: ${productsIds.price}` }</h3>
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ addToCart }
            name={ id }
          >
            +
          </button>
          <h3
            data-testid="shopping-cart-product-quantity"
          >
            { `Quantidade: ${quantity}` }
          </h3>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ decreaseQuantity }
            name={ id }
          >
            -
          </button>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.any,
}.isRequired;

export default Cart;
