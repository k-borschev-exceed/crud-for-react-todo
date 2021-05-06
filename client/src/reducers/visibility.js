export const initialState = 'all';

export function visibilityReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_ACTIVE':
      return 'uncompleted';
    case 'SHOW_ALL':
      return 'all';
    case 'SHOW_COMPLETED':
      return 'completed';
    default:
      return state;
  }
}
