export const initialState = {
  all: 0,
  completed: 0,
  active: 0,
};

export function tasksCounterReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COUNTER':
      console.log('updfate tasks asdsadad');
      return {
        all: action.payload.all,
        completed: action.payload.completed,
        active: action.payload.active,
      };
    default:
      return state;
  }
}
