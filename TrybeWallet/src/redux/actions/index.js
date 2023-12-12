export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_ARRAY = 'SAVE_ARRAY';
export const SAVE_INFO = 'SAVE_INFO';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const FINAL_EDIT_EXPENSE = 'FINAL_EDIT_EXPENSE';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const saveArray = (payload) => ({
  type: SAVE_ARRAY,
  payload,
});

export const saveInfo = (payload) => ({
  type: SAVE_INFO,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const finalEditExpense = (payload) => ({
  type: FINAL_EDIT_EXPENSE,
  payload,
});
