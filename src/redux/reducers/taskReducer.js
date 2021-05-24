import { FETCH_TASKS } from './types.js'

const initialState = { tasks: [] }

export default function taskReducer(state = initialState, action) {

  const { type, payload } = action
  switch (type) {
    case FETCH_TASKS:
      return { tasks: payload.map(task => ({ ...task, start: task.start_time, end: task.end_time, allDay: task.all_day })) }
    default:
      return state
  }
}