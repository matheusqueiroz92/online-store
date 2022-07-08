import React from 'react';
import Button from '../Components/Button';
import CategoryAside from '../Components/CategoryAside';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      thereWasSearch: false,
      products: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { searchText } = this.state;

    const request = await getProductsFromCategoryAndQuery('', searchText);
    console.log(request);
    const products = request.results;

    this.setState({ products, thereWasSearch: true });
  }

  render() {
    const { searchText, products, thereWasSearch } = this.state;

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
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
          </div>
          <Button />
        </header>
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
        <CategoryAside />
        <main>
          {
            products.length === 0 && thereWasSearch
              ? <h2>Nenhum produto foi encontrado</h2>
              : (
                products.map(({ title, thumbnail, price }, index) => (
                  <div key={ index } data-testid="product">
                    <h2>{ title }</h2>
                    <img src={ thumbnail } alt={ title } />
                    <h3>{ price }</h3>
                  </div>
                )))
          }
        </main>
      </div>
    );
  }
}

export default Home;
