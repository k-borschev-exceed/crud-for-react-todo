const initialState = {
  logOrSignUp: 'login',
  isLoggedIn: false,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'login/loggedInStatusChanged': {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    }

    case 'login/loginOrSignupStatusChanged': {
      return {
        ...state,
        logOrSignUp: action.payload,
      };
    }
    default:
      return state;
  }
}
