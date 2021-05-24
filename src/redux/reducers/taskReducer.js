import { FETCH_TASKS, CREATE_TASK } from './types.js'

const initialState = { tasks: [], error: '' }

export default function taskReducer(state = initialState, action) {

  const { type, payload } = action
  switch (type) {
    case FETCH_TASKS:
      return { ...state, tasks: payload.map(task => ({ ...task, start: new Date(task.start_time), end: new Date(task.end_time), allDay: task.all_day })) }
    case CREATE_TASK:
      return { ...state, tasks: state.tasks.concat({ ...payload, start: payload.start_time, end: payload.end_time, allDay: payload.all_day }) }
    default:
      return state
  }
}