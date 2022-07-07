import React from 'react';
import { Link } from 'react-router-dom';

class Button extends React.Component {
  render() {
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
      </div>
    );
  }
}

export default Button;
