export const SAVE_LOGIN_INFO = 'SAVE_LOGIN_INFO';
export const SAVE_SCORE = 'SAVE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

export const saveLogin = (payload) => ({
  type: SAVE_LOGIN_INFO,
  payload,
});

export const saveScore = (payload) => ({
  type: SAVE_SCORE,
  payload,
});

export const resetScore = (payload) => ({
  type: RESET_SCORE,
  payload,
});
