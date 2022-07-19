import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class Button extends React.Component {
  showTotalQuantity() {
    const { quantity } = this.props;
    let showQuantity = 0;

    quantity.forEach((el) => {
      showQuantity += el;
    });
    return showQuantity;
  }

  render() {
    const { quantity } = this.props;
    return (
      <div>
        <Link to="/cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Cart
          </button>
        </Link>
        <h4 data-testid="shopping-cart-size">
          { !quantity || this.showTotalQuantity() }
        </h4>
      </div>
    );
  }
}

Button.propTypes = {
  quantity: PropTypes.any,
}.isRequired;

export default Button;
