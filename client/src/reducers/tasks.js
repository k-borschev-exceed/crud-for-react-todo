export const initialState = [];

export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_TASKS':
      return action.payload;
    case 'CLEAR_TASKS':
      return [];
    default:
      return state;
  }
}
