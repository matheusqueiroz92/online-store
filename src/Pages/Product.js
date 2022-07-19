import React from 'react';
import PropTypes from 'prop-types';
import { addEvaluation, getEvaluations } from '../services/LoadEvaluations';
import Button from '../Components/Button';

class Product extends React.Component {
  constructor() {
    super();

    this.state = ({
      productView: [],
      inputEmail: '',
      inputEvaluation: '',
      rating: '',
      allEvaluations: '',
    });
  }

  componentDidMount() {
    this.callProduct();
    this.loadLocalStorage();
  }

  callProduct = () => {
    const { match: {
      params: {
        id,
      },
    }, showProducts, getInfoFromHome } = this.props;

    if (showProducts.length < 1) return;
    const targetID = showProducts.find((el) => el.id === id);
    getInfoFromHome(showProducts);
    this.setState({
      productView: targetID,
    });
  }

  submitBtnReview = (event) => {
    event.preventDefault();
    const { inputEmail, inputEvaluation, rating } = this.state;
    const evaluationArray = {
      email: inputEmail,
      evaluation: inputEvaluation,
      avaliation: rating,
    };
    addEvaluation(evaluationArray);
    this.setState({
      inputEmail: '',
      inputEvaluation: '',
      rating: '',
    });
    this.loadLocalStorage();
  }

  loadLocalStorage = () => {
    const load = getEvaluations('evaluations');
    this.setState({
      allEvaluations: load,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { productView, inputEmail, inputEvaluation, allEvaluations } = this.state;
    const { addToCart, quantity } = this.props;

    const maxIndex = 5;
    return (
      <section>
        <div>
          <h2 data-testid="product-detail-name">{ productView.title }</h2>
          <img src={ productView.thumbnail } alt={ productView.title } />
          <h3>{ productView.price }</h3>
          <p>{ productView.status }</p>
        </div>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ addToCart }
          name={ productView.id }
        >
          Adicionar ao Carrinho
        </button>
        <Button
          quantity={ quantity }
        />
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
                  data-testid={ `${index + 1}-rating` }
                  value={ index + 1 }
                  name="rating"
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
        {
          !allEvaluations
            ? <h3>Nenhum comentário</h3>
            : (
              allEvaluations.map(({ email, evaluation, avaliation }, index) => (
                <div key={ index }>
                  <h3>{email}</h3>
                  <h3>{avaliation}</h3>
                  <h3>{evaluation}</h3>
                </div>
              ))
            )
        }
      </section>
    );
  }
}

Product.propTypes = {
  addToCart: PropTypes.func,
  quantity: PropTypes.any,
}.isRequired;

export default Product;
