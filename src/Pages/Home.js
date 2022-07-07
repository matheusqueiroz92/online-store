import React from 'react';
import Button from '../Components/Button';

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
      </div>
    );
  }
}

export default Home;
