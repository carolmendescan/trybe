import React from 'react';
import { getCategories, buscaPorCategoria } from '../services/api';
import ProductsCards from './ProductsCards';

class Categories extends React.Component {
  state = {
    categorias: [],
    categoriasResponse: [],
    selectedId: null,
  };

  componentDidMount() {
    this.lista();
  }

  handleInputChange = async ({ target }) => {
    const value = target.id;
    const responseCategories = await buscaPorCategoria(value);
    this.setState({
      selectedId: value,
      categoriasResponse: responseCategories,
    });
  };

  lista = async () => {
    const response = await getCategories();
    this.setState({
      categorias: response,
    });
  };

  render() {
    const { categorias, selectedId, categoriasResponse } = this.state;
    return (
      <div>
        {
          categorias.map(({ name, id }) => (
            <label data-testid="category" key={ id } htmlFor={ id }>
              <input
                id={ id }
                type="radio"
                value={ name }
                onChange={ this.handleInputChange }
                checked={ id === selectedId }
              />
              { name }
            </label>
          ))
        }
        {
          categoriasResponse.map((produto) => (<ProductsCards
            key={ produto.id }
            nome={ produto.title }
            valor={ produto.price }
            imagem={ produto.thumbnail }
            id={ produto.id }
          />))
        }
      </div>
    );
  }
}

export default Categories;
