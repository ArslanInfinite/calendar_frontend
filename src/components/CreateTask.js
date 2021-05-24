import moment from "moment";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const CreateTask = ({ state, toggleModal, handleAddTask, handleInputChange }) => {
  const { title, description, allDay, start, end, showAddTaskModal } = state;
  return (<Modal
    isOpen={showAddTaskModal}
    onRequestClose={toggleModal}
    style={customStyles}
  >
    <button onClick={toggleModal}>close</button>
    <h1>Add a Task</h1>


    <form onSubmit={handleAddTask}>
      Title: <input required name="title" value={title} onChange={handleInputChange} /> <br />
            Description: <input required name="description" value={description} onChange={handleInputChange} /> <br />
            Start Date: <input min={moment().format('YYYY-MM-DDTHH:mm')} required type="datetime-local" name="start" value={start} onChange={handleInputChange} /> <br />
             End Date: <input min={moment(start).format('YYYY-MM-DDTHH:mm')} required type="datetime-local" name="end" value={end} onChange={handleInputChange} /> <br />
              All Day: <input type="checkbox" name="allDay" value={allDay} checked={allDay} onChange={handleInputChange} /> <br />
      <button>Create</button>
    </form>
  </Modal>)
}

export default CreateTask;