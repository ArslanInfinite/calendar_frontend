import moment from "moment";
import Modal from 'react-modal';

const customStyles = {
  content: {
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    top: '48%',
    borderRadius: "12px"
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
      <div className="form-group">
        <label>Title:</label>
        <input required name="title" value={title} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input required name="description" value={description} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Start Date:</label>
        <input min={allDay ? moment().startOf('day').format('YYYY-MM-DDTHH:mm') : moment().format('YYYY-MM-DDTHH:mm')} required type="datetime-local" name="start" value={start} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>End Date:</label>
        <input min={allDay ? '' : moment(start).format('YYYY-MM-DDTHH:mm')} required type="datetime-local" name="end" value={end} onChange={handleInputChange} /> <br />
      </div>
      <div className="form-group">
        <label>All Day:</label>
        <input type="checkbox" name="allDay" className="ml-0" value={allDay} checked={allDay} onChange={handleInputChange} /> <br />
      </div>
      <button>Create</button>
    </form>
  </Modal>)
}

export default CreateTask;