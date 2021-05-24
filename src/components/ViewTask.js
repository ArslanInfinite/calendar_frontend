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

const ViewTask = ({ task, toggleModal, showViewTaskModal, toggleEditModal }) => {
  const { title, description, allDay, end, start } = task;

  const handleEditTask = () => {
    toggleEditModal(task);
  }

  return (<Modal
    isOpen={showViewTaskModal}
    onRequestClose={toggleModal}
    style={customStyles}
  >
    <button onClick={toggleModal}>close</button>
    <h1>{title}</h1>

    <button onClick={handleEditTask}>Edit</button>
    <button onClick={() => {}}>Delete</button>

    <p>Description: {description}</p>
    <p>Start Date/Time: {moment(start).format('MMM DD, YYYY @ HH:mmA')}</p>
    <p>End Date/Time: {moment(end).format('MMM DD, YYYY @ HH:mmA')}</p>
    <p>All Day: {allDay ? 'Yes' : 'No'}</p>
  </Modal>)
}

export default ViewTask;