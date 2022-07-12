import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class Product extends React.Component {
  constructor() {
    super();

    this.state = ({
      productView: [],
      inputEmail: '',
      inputEvaluation: '',
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

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      rating: value,
    });
  }

  render() {
    const { productView, inputEmail, inputEvaluation, rating } = this.state;
    console.log(inputEvaluation, rating);
    const maxIndex = 5;
    return (
      <section>
        <div>
          <h2 data-testid="product-detail-name">{ productView.title }</h2>
          <img src={ productView.thumbnail } alt={ productView.title } />
          <h3>{ productView.price }</h3>
          <p>{ productView.status }</p>
        </div>
        <form>
          <input
            type="text"
            data-testid="product-detail-email"
            onChange={ this.onInputChange }
            value={ inputEmail }
            name="inputEmail"
          />
          {
            [...Array(maxIndex)].map((el, index) => (
              <div onChange={ this.onInputChange } key={ index }>
                {index + 1}
                <input
                  type="radio"
                  data-testid={ `${index}-rating` }
                  value={ index + 1 }
                />
              </div>
            ))
          }
          <input
            type="text"
            data-testid="product-detail-evaluation"
            onChange={ this.onInputChange }
            value={ inputEvaluation }
            name="inputEvaluation"
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.submitBtnReview }
          >
            Avaliar
          </button>
        </form>
      </section>
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
