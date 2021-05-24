import { DELETE_TASK, SET_ERROR } from '../reducers/types';

export default function deleteTask(taskId) {
  return async (dispatch) => {
    try {
      const resp = await fetch(`http://localhost:3001/api/v1/tasks/${taskId}`, {
        method: 'delete'
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