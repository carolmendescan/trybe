import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductsCards extends React.Component {
  handleClick = () => {
    const { nome, valor, imagem, id } = this.props;
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const objProducts = { name: nome, value: valor, image: imagem, id };
    products = [...products, objProducts];
    localStorage.setItem('products', JSON.stringify(products));
  };

  render() {
    const { nome, valor, imagem, id } = this.props;
    return (
      <div>
        <Link to={ `/ProductDetails/${id}` } data-testid="product-detail-link">
          <div data-testid="product">
            <h2>{nome}</h2>
            <img src={ imagem } alt={ nome } />
          </div>
        </Link>
        <h3>
          R$
          {valor}
        </h3>
        <button
          data-testid="product-add-to-cart"
          onClick={ this.handleClick }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductsCards.propTypes = {
  nome: PropTypes.string,
  valor: PropTypes.number,
  imagem: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default ProductsCards;
