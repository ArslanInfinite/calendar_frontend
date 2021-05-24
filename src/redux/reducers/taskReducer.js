import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK } from './types.js'

const initialState = { tasks: [], error: '' }

export default function taskReducer(state = initialState, action) {

  const { type, payload } = action
  switch (type) {
    case FETCH_TASKS: {
      return { ...state, tasks: payload.map(task => ({ ...task, start: new Date(task.start.slice(0, 16)), end: new Date(task.end.slice(0, 16)), allDay: task.all_day })) };
    }
    case CREATE_TASK:
      return { ...state, tasks: state.tasks.concat({ ...payload, start: new Date(payload.start.slice(0, 16)), end: new Date(payload.end.slice(0, 16)), allDay: payload.all_day }) };
    case UPDATE_TASK: {
      const updatedTask = { ...payload, start: new Date(payload.start.slice(0, 16)), end: new Date(payload.end.slice(0, 16)), allDay: payload.all_day };
      const taskIndex = state.tasks.findIndex(t => t.id === updatedTask.id);
      const clonedTasks = [...state.tasks];
      clonedTasks.splice(taskIndex, 1, updatedTask);
      return { ...state, tasks: clonedTasks}
    }
    default:
      return state;
  }
}