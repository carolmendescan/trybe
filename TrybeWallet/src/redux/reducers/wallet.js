import { DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_ARRAY,
  SAVE_INFO,
  FINAL_EDIT_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INICIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  total: 0,
};

const soma = (payload) => {
  const totalSum = payload.expenses.reduce(((acc, cur) => {
    const total = cur.value * cur.exchangeRates[cur.currency].ask;
    acc += total;
    return acc;
  }), 0);
  return totalSum.toFixed(2);
};

const wallet = (state = INICIAL_STATE, action) => {
  const newExpenses = state.expenses.filter((expense) => action.payload !== expense.id);
  // console.log(state.expenses);
  // console.log(newExpenses);
  switch (action.type) {
  case SAVE_ARRAY:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_INFO:
    // console.log('entrei no saveinfo');
    return {
      ...state,
      expenses: [...state.expenses, {
        id: !state.expenses.length ? 0 : state.expenses.length,
        ...action.payload,
      }],
      total: soma({ expenses: [...state.expenses, action.payload] }),
    };
  case DELETE_EXPENSE:
    // console.log('entrei no delete');
    return {
      ...state,
      expenses: newExpenses,
      total: soma({ expenses: newExpenses }),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case FINAL_EDIT_EXPENSE:
  {
    const newExpenseEdited = state.expenses.map((expense) => {
      console.log(expense);
      console.log(action.payload);
      if (expense.id === state.idToEdit) return { ...expense, ...action.payload };
      return expense;
    });
    return {
      ...state,
      expenses: newExpenseEdited,
      editor: false,
      total: soma({ expenses: newExpenseEdited }),
    };
  }

  default: return state;
  }
};
export default wallet;
