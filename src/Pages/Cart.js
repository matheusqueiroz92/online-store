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
    const { cartItems } = this.props;
    console.log(cartItems);
    const productsList = await getProductById(cartItems);
    const { title, price, available_quantity } = productsList;
    console.log(title, price, available_quantity);
    const fullProducts = productsList;
    this.setState((prevState) => ({
      productsIds: [...prevState.productsIds, fullProducts],
    }));
  }

  render() {
    const { productsIds } = this.state;
    console.log(productsIds);
    return (
      <div>
        {/* {
          cartItems.length > 0
            ? (
              cartItems.map(() => )
            )
        } */}
        <h2 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h2>
      </div>
    );
  }
}

export default Cart;
