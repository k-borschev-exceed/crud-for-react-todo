const initialState = {
  isLoggedIn : false,
  logOrSignUp: 'login',
  tasks: [],
  tasksCounter: {
    all: 0,
    completed: 0,
    active: 0
  },
  visibility: 'all'
}

export const rootReducer = (state = initialState, action)  => {
  switch (action.type) {
    case 'tasks/tasksUpdated' : {
      return {
        ...state,
        tasks : action.payload
      }
    }

    case 'tasks/tasksCleared' : {
      return {
        ...state,
        tasks: []
      }
    }

    case 'tasks/tasksCounterUpdated' : {
      return {
        ...state,
        tasksCounter: {
          all : action.payload.all,
          completed: action.payload.completed,
          active: action.payload.active
        }
      }
    }


    case 'filters/loggedInStatusChanged': {
      return { 
        ...state,
        isLoggedIn: action.payload
      }
    }

    case 'filters/loginOrSignupStatusChanged' : {
      return {
        ...state,
        logOrSignUp: action.payload
      }
    }

    case 'filters/visibilityAllShowed' : {
      return { 
        ...state,
        visibility: 'all'
      }
    }

    case 'filters/visibilityActiveShowed' : {
      return { 
        ...state,
        visibility: 'uncompleted'
      }
    }

    case 'filters/visibilityCompletedShowed' : {
      return { 
        ...state,
        visibility: 'completed'
      }
    }

    default: {
      return state;
    }
  }
}