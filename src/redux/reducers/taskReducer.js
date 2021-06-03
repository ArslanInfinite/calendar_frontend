import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from './types.js'

const initialState = { data: [], error: '' }

export default function taskReducer(state = initialState, action) {

  const { type, payload } = action
  switch (type) {
    case FETCH_TASKS: {
      return { ...state, data: payload.map(task => ({ 
        ...task, 
        start: new Date(task.start.slice(0, 16)), 
        end: new Date(task.end.slice(0, 16)), 
        allDay: task.all_day })) };
    }
    
    case CREATE_TASK: {
      console.log('payload==>>', payload)
      return {
        ...state, data: state.data.concat({
          ...payload,
          start: new Date(payload.start.slice(0, 16)),
          end: new Date(payload.end.slice(0, 16)),
          allDay: payload.all_day
          // .slice(0, 16) is used to remove the seconds and milliseconds otherwise the date would not show the correct values, also causing bugs
        })
      };
    }

    case UPDATE_TASK: {
      const updatedTask = { 
        ...payload, 
        start: new Date(payload.start.slice(0, 16)), 
        end: new Date(payload.end.slice(0, 16)), 
        allDay: payload.all_day };

      const taskIndex = state.data.findIndex(t => t.id === updatedTask.id);
      const clonedTasks = [...state.data];
      clonedTasks.splice(taskIndex, 1, updatedTask);
      return { ...state, data: clonedTasks}
    }

    case DELETE_TASK:
      return { ...state, data: state.data.filter(task => task.id !== payload) };    
    
    default:
      return state;
  }
}