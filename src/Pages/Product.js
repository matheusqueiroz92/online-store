import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class Product extends React.Component {
  constructor() {
    super();

    this.state = ({
      productView: [],
    });
  }

  componentDidMount() {
    this.callProduct();
  }

  callProduct = async () => {
    const { match: {
      params: {
        id,
      },
    } } = this.props;

    const productCalled = await getProductById(id);

    this.setState({
      productView: productCalled,
    });
  }

  render() {
    const { productView } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{ productView.title }</h2>
        <img src={ productView.thumbnail } alt={ productView.title } />
        <h3>{ productView.price }</h3>
        <p>{ productView.status }</p>
      </div>
    );
  }
}

Product.propTypes = {
  match: {
    params: {
      id: PropTypes.string,
    },
  },
}.isRequired;

export default Product;
