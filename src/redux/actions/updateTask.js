import { SET_ERROR, UPDATE_TASK } from '../reducers/types';

export default function createTask(taskToUpdate) {
  return async (dispatch) => {
    try {
      const resp = await fetch(`http://localhost:3001/api/v1/tasks/${taskToUpdate.id}`, {
        method: 'PUT',
        body: JSON.stringify({ task: taskToUpdate }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const task = await resp.json();
      dispatch({
        type: UPDATE_TASK,
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