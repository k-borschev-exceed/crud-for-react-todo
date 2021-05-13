const initialState = []

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case 'tasks/tasksUpdated': {
      return action.payload
    }

    case 'tasks/tasksCleared': {
      return []
    }

    default:
      return state;
  }
}
