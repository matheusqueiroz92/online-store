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
      categoriesBtnClick: false,
    };
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
      products,
      searchBtnClick: true,
      categoriesBtnClick: false,
    });
  }

  handleClickCategoryBtn = async ({ target }) => {
    const productsToShow = await
    getProductsFromCategoryAndQuery('', target.innerText);
    // console.log(productsToShow.results);

    this.setState({
      searchBtnClick: false,
      categoriesProducts: productsToShow.results,
      categoriesBtnClick: true,
    });
  }

  render() {
    const { searchText, products, categoriesProducts,
      categoriesBtnClick, searchBtnClick } = this.state;
    const { addToCart } = this.props;

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
          <Button />
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
            (products.length === 0 && searchBtnClick)
              ? <h2>Nenhum produto foi encontrado</h2>
              : (
                products.map(({ title, thumbnail, price, id }, index) => (
                  <div key={ index } data-testid="product">
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
                )))
          }
          {
            categoriesBtnClick
            && categoriesProducts.map(({ title, thumbnail, price, id }, index) => (
              <div key={ index } data-testid="product">
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
            ))
          }
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Home;
