const initialState = {
  visibility: 'all',
  logOrSignUp: 'login',
  isLoggedIn: false,
  tasksCounter: {
    all: 0,
    completed: 0,
    active: 0,
  },
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/visibilityStatusChanged' : {
        return {
            ...state,
            visibility: action.payload
        }
    }

    case 'filters/tasksCounterUpdated': {
      return {
        ...state,
        tasksCounter: {
          all: action.payload.all,
          completed: action.payload.completed,
          active: action.payload.active,
        },
      };
    }

    default:
      return state;
  }
}
