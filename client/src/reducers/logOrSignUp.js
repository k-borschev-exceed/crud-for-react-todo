export const initialState = 'login';

export function logOrSignUpReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOGORSIGNUP_CONDITION':
      return action.payload;
    default:
      return state;
  }
}
