import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Components/Button';
import CategoryAside from '../Components/CategoryAside';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      products: [],
      categoriesProducts: [],
      searchBtnClick: false,
    };
  }

  componentDidUpdate() {
    const { categoriesProducts } = this.state;
    const { getInfoFromHome } = this.props;

    getInfoFromHome(categoriesProducts);
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClickSearchBtn = async () => {
    const { searchText } = this.state;

    const request = await getProductsFromCategoryAndQuery('', searchText);
    const products = request.results;
    this.setState({
      categoriesProducts: products,
      searchBtnClick: true,
    });
  }

  handleClickCategoryBtn = async ({ target }) => {
    const productsToShow = await getProductsFromCategoryAndQuery('', target.innerText);

    const productsInfo = productsToShow;

    this.setState({
      searchBtnClick: false,
      categoriesProducts: productsInfo.results,
    });
  }

  render() {
    const { searchText, products, categoriesProducts,
      searchBtnClick } = this.state;
    const { addToCart, quantity } = this.props;
    console.log(categoriesProducts);

    return (
      <div>
        <header>
          <div>
            <form>
              <input
                type="text"
                onChange={ this.onInputChange }
                value={ searchText }
                name="searchText"
                data-testid="query-input"
              />
              <button
                type="button"
                data-testid="query-button"
                onClick={ this.handleClickSearchBtn }
              >
                Pesquisar:
              </button>
            </form>
          </div>
          <Button
            quantity={ quantity }
          />
        </header>
        <CategoryAside
          handleClickCategoryBtn={ this.handleClickCategoryBtn }
        />
        <main>
          {
            (categoriesProducts.length === 0
              && products.length === 0)
              ? (
                <h4 data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </h4>
              ) : ''
          }
          {
            (categoriesProducts.length === 0 && searchBtnClick)
              ? <h2>Nenhum produto foi encontrado</h2>
              : (
                categoriesProducts.map(
                  ({ title, thumbnail, price, id, shipping }, index) => (
                    <div key={ index } data-testid="product">
                      {
                        shipping.free_shipping
                        && <h3 data-testid="free-shipping">Frete Grátis</h3>
                      }
                      <Link data-testid="product-detail-link" to={ `/product/${id}` }>
                        <h2>{ title }</h2>
                        <img src={ thumbnail } alt={ title } />
                        <h3>{ price }</h3>
                      </Link>
                      <button
                        type="button"
                        data-testid="product-add-to-cart"
                        onClick={ addToCart }
                        name={ id }
                      >
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  ),
                ))
          }
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func,
  getInfoFromHome: PropTypes.func,
  quantity: PropTypes.any,
}.isRequired;

export default Home;
