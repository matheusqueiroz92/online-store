import React from 'react';
import { getCategories } from '../services/api';

class CategoryAside extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.handleCategories();
  }

  handleCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;

    return (
      <section>
        <h3>Categorias</h3>
        <div>
          {
            categories.map(({ id, name }) => (
              <div key={ id }>
                <button
                  type="button"
                  data-testid="category"
                >
                  { name }
                </button>
              </div>
            ))
          }
        </div>
      </section>
    );
  }
}

export default CategoryAside;
