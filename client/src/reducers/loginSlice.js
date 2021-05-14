const initialState = {
  logOrSignUp: 'login',
  isLoggedIn: false,
  email : ''
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

    case 'login/setEmail' : {
      return {
        ...state,
        email : action.payload
      }
    }
    default:
      return state;
  }
}
