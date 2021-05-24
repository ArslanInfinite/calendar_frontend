import { CREATE_TASK, SET_ERROR } from '../reducers/types';

export default function createTask(newTask) {
  return async (dispatch) => {
    try {
      const resp = await fetch('http://localhost:3001/api/v1/tasks', {
        method: 'post',
        body: JSON.stringify({ task: newTask }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const task = await resp.json();
      dispatch({
        type: CREATE_TASK,
        payload: task
      });
    } catch(err) {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    }
  }
}

//.then/.catch  OR async/await