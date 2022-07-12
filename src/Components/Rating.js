import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    const { index } = this.props;
    return (
      <div>
        <input
          type="radio"
          data-testid={ `${index}-rating` }
          value={ index }
        />
      </div>
    );
  }
}

Rating.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Rating;
