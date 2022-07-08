import React from 'react';
import Button from '../Components/Button';
import CategoryAside from '../Components/CategoryAside';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categoriesProducts: [],
    };
  }

  handleClick = async ({ target }) => {
    const categories = await getCategories();
    const theSame = categories.filter((element) => element.name === target.innerText);

    const categoryId = theSame[0].id;
    const categoryName = theSame[0].name;

    const productsToShow = await
    getProductsFromCategoryAndQuery(categoryId, categoryName);
    // console.log(productsToShow.results);

    this.setState({
      categoriesProducts: productsToShow.results,
    });
  }

  render() {
    const { categoriesProducts } = this.state;
    return (
      <div>
        <header>
          <div>
            <form>
              <input type="text" />
            </form>
          </div>
          <Button />
        </header>
        <CategoryAside
          handleClick={ this.handleClick }
        />
        <div>
          {
            categoriesProducts.length === 0
              ? (
                <h4 data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </h4>)
              : categoriesProducts.map((element, index) => (
                <div data-testid="product" key={ index }>
                  <p>{ element.title }</p>
                  <img src={ element.thumbnail } alt={ element.name } />
                  <p>{ `R$ ${element.price} `}</p>
                </div>
              ))
          }
        </div>
      </div>
    );
  }
}

export default Home;
