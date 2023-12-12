import React from 'react';
import PropTypes from 'prop-types';

class ItemCart extends React.Component {
  state = {
    qtd: 1,
  };

  incrementarQtd = () => {
    this.setState((prevState) => ({ qtd: prevState.qtd + 1 }));
  };

  diminuirQtd = () => {
    const { qtd } = this.state;
    if (qtd >= 2) {
      this.setState((prevState) => ({ qtd: prevState.qtd - 1 }));
    }
  };

  render() {
    const { image, name, value, removeProduto, id } = this.props;
    const { qtd } = this.state;
    return (
      <div>
        <h2 data-testid="shopping-cart-product-name">{ name }</h2>
        <img src={ image } alt={ name } />
        <h3>
          R$
          { value }
        </h3>
        <h3 data-testid="shopping-cart-product-quantity">{ qtd }</h3>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.incrementarQtd }
        >
          +
        </button>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.diminuirQtd }
        >
          -
        </button>
        <button
          type="button"
          data-testid="remove-product"
          onClick={ () => removeProduto(id) }
        >
          X
        </button>
      </div>
    );
  }
}

export default ItemCart;

ItemCart.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  qtd: PropTypes.string,
}.isRequired;
