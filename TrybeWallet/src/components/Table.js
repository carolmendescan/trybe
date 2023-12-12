import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import btnDelete from '../imgs/deleteBtnVector.png';
import btnEdit from '../imgs/editBtnVector.png';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ Number(expense.value).toFixed(2) }</td>
              <td>{ expense.currency }</td>
              <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
              <td>
                { (expense.value
                * expense.exchangeRates[expense.currency].ask).toFixed(2) }
              </td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => dispatch(deleteExpense(expense.id)) }
                >
                  <img src={ btnDelete } alt="" />
                </button>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => dispatch(editExpense(expense.id)) }
                >
                  <img src={ btnEdit } alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.wallet,
  idToEdit: state.wallet.idToEdit,

});

export default connect(mapStateToProps)(Table);
