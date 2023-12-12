import React from 'react';
import ItemCart from '../Components/ItemCart';

class Cart extends React.Component {
  state = {
    produtosState: [],
  };

  componentDidMount() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    this.setState({
      produtosState: products,
    });
  }

  removeProduto = (id) => {
    const { produtosState } = this.state;
    const filtrar = produtosState.filter((produto) => produto.id !== id);
    this.setState({
      produtosState: filtrar,
    });
    localStorage.setItem('products', JSON.stringify(filtrar));
  };

  render() {
    const { produtosState } = this.state;
    if (produtosState.length === 0) {
      return (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      );
    }
    return (
      <div>
        {produtosState.map((produto, i) => (
          <ItemCart
            key={ i }
            id={ produto.id }
            image={ produto.image }
            name={ produto.name }
            value={ produto.value }
            removeProduto={ this.removeProduto }
          />
        ))}
      </div>
    );
  }
}

export default Cart;

// pessoal minha pausa foi aceita, muito obrigado por passar esse tempo com vcs, foi bem legal aprendi bastante, mas eu preciso me tratar
// Boa sorte e bom projeto pra vcs !!!
