import { combineReducers } from 'redux'

import tasksReducer from './tasksSlice'
import filtersReducer from './filtersSlice'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
})

