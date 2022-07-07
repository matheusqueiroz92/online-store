import React from 'react';
import Button from '../Components/Button';
import CategoryAside from '../Components/CategoryAside';

class Home extends React.Component {
  render() {
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
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
        <CategoryAside />
      </div>
    );
  }
}

export default Home;
