import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';
import Categories from '../Components/Categories';
import ProductsCards from '../Components/ProductsCards';
import { buscaPorTermo } from '../services/api';

class Search extends React.Component {
  state = {
    results: [],
    pesquisa: '',
    showMessage: true,
    houvePesquisa: false,
  };

  fetchProducts = async () => {
    const { pesquisa } = this.state;
    const response = await buscaPorTermo(pesquisa);
    this.setState({
      results: response,
      houvePesquisa: true,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifySearch);
  };

  verifySearch = () => {
    const { pesquisa } = this.state;
    if (pesquisa.length > 0) {
      this.setState({
        showMessage: false,
      });
    } else {
      this.setState({
        showMessage: true,
      });
    }
  };

  render() {
    const { pesquisa,
      showMessage,
      results,
      houvePesquisa,
    } = this.state;
    return (
      <div>
        <Link to="./Cart" data-testid="shopping-cart-button">
          <Button textButton="carrinho" />
        </Link>
        <Categories />
        <label htmlFor="pesquisa">
          Buscar produtos:
          <input
            data-testid="query-input"
            onChange={ this.handleChange }
            value={ pesquisa }
            name="pesquisa"
            type="text"
            placeholder="Produto/categoria"
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.fetchProducts }
        >
          Pesquisar
        </button>
        {showMessage
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        { results.length === 0 && houvePesquisa ? 'Nenhum produto foi encontrado'
          : (
            results.map((produto) => (<ProductsCards
              key={ produto.id }
              nome={ produto.title }
              valor={ produto.price }
              imagem={ produto.thumbnail }
              id={ produto.id }
            />))
          )}
      </div>
    );
  }
}

export default Search;
