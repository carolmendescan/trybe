import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { finalEditExpense, saveArray, saveInfo } from '../redux/actions';

const Alimento = 'Alimentação';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: Alimento,
  };

  componentDidMount() {
    this.fetchAPIKeys();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  fetchAPIKeys = async () => {
    const { dispatch } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const array = Object.keys(data).filter((moeda) => moeda !== 'USDT');
    dispatch(saveArray(array));
  };

  saveObject = async () => {
    const { dispatch } = this.props;
    const estado = this.state;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    dispatch(saveInfo({
      ...estado,
      exchangeRates: data,
    }));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimento,
    });
  };

  replaceExpense = () => {
    const { dispatch, expenses, idToEdit } = this.props;
    const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
    const expenseEdited = Object.keys(this.state).reduce((acc, curr) => {
      const { state } = this;
      if (state[curr] === '' || expenseToEdit[curr] === state[curr]) {
        return { ...acc, [curr]: expenseToEdit[curr] };
      }
      return { ...acc, [curr]: state[curr] };
    }, {});
    dispatch(finalEditExpense(expenseEdited));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimento,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;

    return (
      <form>
        <label htmlFor="valueID">
          Valor
          <input
            type="text"
            name="value"
            id="valueID"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="descriptionID">
          Descrição da despesa
          <input
            type="text"
            data-testid="description-input"
            name="description"
            id="descriptionID"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="moedaID">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            id="moedaID"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((moeda) => (
              <option
                key={ moeda }
                value={ moeda }
              >
                { moeda }
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="methodID">
          Método de Pagamento
          <select
            data-testid="method-input"
            name="method"
            id="methodID"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tagID">
          Categoria da despesa
          <select
            data-testid="tag-input"
            name="tag"
            id="tagID"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        {editor ? (
          <button
            type="button"
            label="Editar despesa"
            value="Editar despesa"
            onClick={ this.replaceExpense }
          >
            Editar despesa
          </button>
        )
          : (
            <button
              type="button"
              label="Adicionar despesa"
              value="Adicionar despesa"
              onClick={ this.saveObject }
            >
              Adicionar despesa
            </button>
          )}

      </form>
    );
  }
}
WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
