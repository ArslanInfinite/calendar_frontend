import { FETCH_TASKS } from './types.js'

const initialState = { tasks: [] }

export default function taskReducer(state = initialState, action) {
  
  const { type } = action 
  switch ( type ) {
    case FETCH_TASKS:
      return { tasks: action.payload }
    default:
      return state
  }
}