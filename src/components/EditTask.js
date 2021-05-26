import moment from "moment";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '48%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "12px"
  }
};

const CreateTask = ({ state, toggleModal, handleUpdateTask, handleInputChange }) => {
  const { title, description, allDay, start, end, showEditTaskModal } = state;
  return (<Modal
    isOpen={showEditTaskModal}
    onRequestClose={toggleModal}
    style={customStyles}
  >
    <button onClick={toggleModal}>close</button>
    <h1>Edit a Task</h1>

    <form onSubmit={handleUpdateTask}>
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
            <input min={moment().format('YYYY-MM-DDTHH:mm')} required type="datetime-local" name="start" value={start} onChange={handleInputChange} /> 
      </div>
      < div className="form-group">
        <label>End Date:</label>
          <input min={moment(start).format('YYYY-MM-DDTHH:mm')} required type="datetime-local" name="end" value={end} onChange={handleInputChange} /> 
          </div>
          <div className="form-group">
            <label>All Day:</label>
            <input type="checkbox" name="allDay" value={allDay} checked={allDay} onChange={handleInputChange} /> 
            <br />
          </div>
      <button>Update</button>
    </form>
  </Modal>)
}

export default CreateTask;