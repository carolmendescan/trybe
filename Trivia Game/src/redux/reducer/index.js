import { RESET_SCORE, SAVE_LOGIN_INFO, SAVE_SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case (SAVE_LOGIN_INFO):
    return ({
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    });
  case (SAVE_SCORE):
    return ({
      ...state,
      score: action.payload.score + state.score,
      assertions: action.payload.assertions,
    });
  case (RESET_SCORE):
    return ({
      ...state,
      score: 0,
      assertions: 0,
    });
  default:
    return state;
  }
};

export default rootReducer;
