import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import taskReducer from './reducers/taskReducer'

export const store = createStore(taskReducer, applyMiddleware(thunk))