import { FETCH_TASKS, SET_ERROR } from '../reducers/types';
//.then/.catch or async/await (with try/catch)
export default function fetchTasks() {
  return async (dispatch) => {
    try {
      const resp = await fetch('http://localhost:3001/api/v1/tasks');
      const tasks = await resp.json();
      dispatch({
        type: FETCH_TASKS,
        payload: tasks
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    }
  }
}