import React from 'react';
import PropTypes from 'prop-types';

class ProductDetails extends React.Component {
  state = {
    infoDetails: [],
  };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const detalhes = await response.json();

    this.setState({
      infoDetails: detalhes,
    });
  };

  handleClick = () => {
    const { infoDetails: { title, price, thumbnail, id } } = this.state;
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({ name: title, value: price, image: thumbnail, id });
    localStorage.setItem('products', JSON.stringify(products));
  };

  render() {
    const { infoDetails: { title, price, thumbnail, warranty } } = this.state;
    const { history } = this.props;
    return (
      <div>
        <div>
          <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
          <h2 data-testid="product-detail-name">{ title }</h2>
          <p data-testid="product-detail-price">
            R$
            {' '}
            { price }
          </p>
          <p>{ warranty }</p>
        </div>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleClick }
        >
          Comprar
        </button>
        <button
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/Cart') }
        >
          🛒Ir para o Carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProductDetails;

/*
CRIAR ROTA NO APP
importa o ProductDetails no topo

<Route path="./ProductDetails/:id" render={ (props) => <ProductDetails {...props} /> } />

=======================================================
ESSA PARTE VAI NO PRODUCTSCARDS
Não esquecer de importar no topo do productsCards:
import { Link } from 'react-router-dom';

render() {
  const {nome, valor, imagem, id} = this.props
  return(
    <Link to={`/ProductDetails/${id}`} data-testid="product-detail-link">
    ProductsCards -> envolve o meu card me direcionando para a pagina de detalhes do produto
    </Link>
  )
}

no proptypes colocar id: string

=======================================================
objeto retornado da fetchDetails:
https://api.mercadolibre.com/items/MLB3180955094

=====================================================
objeto retornado da fetchProducts no Search:
https://api.mercadolibre.com/sites/MLB/search?q=agua

*/
