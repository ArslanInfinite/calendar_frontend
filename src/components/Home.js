import React, { useState } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import Modal from 'react-modal';
import sampleTasks from '../tasks'
import ExampleControlSlot from './ExampleControlSlot'
import "react-big-calendar/lib/css/react-big-calendar.css";

const propTypes = {}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const localizer = momentLocalizer(moment);

const Selectable = () => {
  const [state, setState] = useState({
    tasks: sampleTasks,
    modalIsOpen: false,
    title: '',
    description: '',
    allDay: false,
    startDate: '',
    endDate: ''
  });
  const { tasks, modalIsOpen, title, description, allDay, startDate, endDate } = state;
  /*const [tasks, setEvents] = useState(sampleTasks);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');*/

  const toggleModal = () => setState(prev => ({
    ...prev,
    modalIsOpen: !prev.modalIsOpen,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    allDay: false
  }));

  const handleSelect = ({ start, end }) => {
    setState(prev => ({
      ...prev,
      startDate: moment(start).format('YYYY-MM-DDTHH:mm'),
      endDate: moment(end).format('YYYY-MM-DDTHH:mm'),
      modalIsOpen: true
    }));
    /*const title = window.prompt('New Event name')
    if (title)
      this.setState({
        tasks: [
          ...this.state.tasks,
          {
            start,
            end,
            title,
          },
        ],
      })*/
  }

  const handleAddTask = event => {
    event.preventDefault();
    console.log('satte in submit==>>', state)
  }

  const handleInputChange = event => {
    const { name, value, type, checked } = event.target
    if (type === 'checkbox') {
      setState(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setState(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <>
      <ExampleControlSlot.Entry waitForOutlet>
        <strong>
          Click an event to see more info, or drag the mouse over the calendar
          to select a date/time range.
          </strong>
      </ExampleControlSlot.Entry>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        style={customStyles}
      >

        <h1>Add a Task</h1>
        <button onClick={toggleModal}>close</button>

        <form onSubmit={handleAddTask}>
          Title: <input required name="title" value={title} onChange={handleInputChange} /> <br />
            Description: <input required name="description" value={description} onChange={handleInputChange} /> <br />
            Start Date: <input required type="datetime-local" name="startDate" value={startDate} onChange={handleInputChange} /> <br />
             End Date: <input required type="datetime-local" name="endDate" value={endDate} onChange={handleInputChange} /> <br />
              All Day: <input type="checkbox" name="allDay" value={allDay} checked={allDay} onChange={handleInputChange} /> <br />
          <button>Create</button>
        </form>
      </Modal>

      <Calendar
        selectable
        localizer={localizer}
        events={tasks}
        defaultView={Views.WEEK}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2015, 3, 12)}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
        style={{ height: "100vh" }}
      />
    </>
  )
}

Selectable.propTypes = propTypes

export default Selectable