import { combineReducers } from 'redux';
import { visibilityReducer } from './visibility';
import { isLoggedInReducer } from './isLoggedIn';
import { tasksCounterReducer } from './tasksCounter';
import { tasksReducer } from './tasks';
import { logOrSignUpReducer } from './logOrSignUp';

export const rootReducer = combineReducers({
  visibility: visibilityReducer,
  isLoggedIn: isLoggedInReducer,
  tasksCounter: tasksCounterReducer,
  tasks: tasksReducer,
  logOrSignUp: logOrSignUpReducer,
});
