export default function fetchTasks() {
  return (dispatch) => {
    fetch('http://localhost:3001/api/v1/tasks')
      .then(resp => resp.json())
      .then(tasks => dispatch({
        type: 'FETCH_TASKS',
        payload: tasks
      }))
  }
}