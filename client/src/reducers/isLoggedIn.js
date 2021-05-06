export const initialState = false;

export function isLoggedInReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOGIN_CONDITION':
      return action.payload;
    default:
      return state;
  }
}
