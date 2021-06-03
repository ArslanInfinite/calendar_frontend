import moment from "moment";
import Modal from 'react-modal'; //Modal is a popup window 

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

const ViewTask = ({ currentTask, toggleViewModal, showViewTaskModal, toggleEditModal, handleDeleteTask }) => {
  const { title, description, allDay, end, start } = currentTask;

  const handleEditTask = () => {
    toggleEditModal(currentTask);
  }

  return (<Modal
    isOpen={showViewTaskModal}
    onRequestClose={toggleViewModal}
    style={customStyles}
    >
    <button onClick={toggleViewModal}>close</button>
    <h1>{title}</h1>

    <button onClick={handleEditTask}>Edit</button>
    <button onClick={handleDeleteTask}>Delete</button>

    <p>Description: {description}</p>
    <p>Start Date/Time: {moment(start).format('MMM DD, YYYY @ HH:mmA')}</p>
    <p>End Date/Time: {moment(end).format('MMM DD, YYYY @ HH:mmA')}</p>
    <p>All Day: {allDay ? 'Yes' : 'No'}</p>
  </Modal>)
}

export default ViewTask;