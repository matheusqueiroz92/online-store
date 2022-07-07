import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input type="text" />
        </form>
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
      </div>
    );
  }
}

export default Home;
