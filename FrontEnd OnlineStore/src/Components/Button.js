import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { textButton } = this.props;
    return (
      <button type="button">
        { textButton }
      </button>
    );
  }
}

Button.propTypes = {
  textButton: PropTypes.string,
}.isRequired;

export default Button;
