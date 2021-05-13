const VisibilityFilters = {
  All: 'all',
  Active: 'uncompleted',
  Completed: 'completed',
};

const initialState = {
  visibility: VisibilityFilters.All,
  logOrSignUp: 'login',
  isLoggedIn: false,
  tasksCounter: {
    all: 0,
    completed: 0,
    active: 0
  }
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/loggedInStatusChanged': {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    }

    case 'filters/loginOrSignupStatusChanged': {
      return {
        ...state,
        logOrSignUp: action.payload,
      };
    }

    case 'filters/visibilityAllShowed': {
      return {
        ...state,
        visibility: 'all',
      };
    }

    case 'filters/visibilityActiveShowed': {
      return {
        ...state,
        visibility: 'uncompleted',
      };
    }

    case 'filters/visibilityCompletedShowed': {
      return {
        ...state,
        visibility: 'completed',
      };
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
