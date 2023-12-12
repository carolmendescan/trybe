import { SAVE_EMAIL } from '../actions';
// Esse reducer será responsável por tratar as informações da pessoa usuária
const INICIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:

    return state;
  }
};

export default user;
