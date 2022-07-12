import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import { getEvaluations, saveEvaluations } from '../services/LoadEvaluations';

class Product extends React.Component {
  constructor() {
    super();

    this.state = ({
      productView: [],
      inputEmail: '',
      inputEvaluation: '',
      rating: '',
      allEvaluations: [],
    });
  }

  componentDidMount() {
    this.callProduct();
    this.loadLocalStorage();
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

  submitBtnReview = (event) => {
    event.preventDefault();
    saveEvaluations(this.state);
    this.setState({
      inputEmail: '',
      inputEvaluation: '',
      rating: '',
    });
  }

  loadLocalStorage = () => {
    const load = getEvaluations('evaluations');
    this.setState((prevState) => ({
      allEvaluations: [...prevState.allEvaluations, load],
    }));
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { productView, inputEmail, inputEvaluation, allEvaluations } = this.state;

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
          allEvaluations.length === 0
            ? <h3>Nenhum comentário</h3>
            : (
              allEvaluations.map((element) => element.allEvaluations.map((el, index) => (
                <div key={ index }>
                  <h3>{el.inputEmail}</h3>
                  <h3>{el.rating}</h3>
                  <h3>{el.inputEvaluation}</h3>
                </div>))))
        }
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
