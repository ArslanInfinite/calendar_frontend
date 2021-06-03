import { DELETE_TASK, SET_ERROR } from '../reducers/types';

export default function deleteTask(taskId) {
  return async (dispatch) => {
    try {
      await fetch(`http://localhost:3001/api/v1/tasks/${taskId}`, {
        method: 'DELETE'
      });
      dispatch({
        type: DELETE_TASK,
        payload: taskId
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    }
  }
}