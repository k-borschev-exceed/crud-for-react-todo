import { combineReducers } from 'redux'

import tasksReducer from './tasksSlice'
import filtersReducer from './filtersSlice'
import loginReducer from './loginSlice'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
  login: loginReducer
})

