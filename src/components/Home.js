import React, { useState, useEffect } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import Modal from 'react-modal';
import { connect } from 'react-redux';
import ExampleControlSlot from './ExampleControlSlot'
import fetchTasks from '../redux/actions/fetchTasks';
import createTask from '../redux/actions/createTask';
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

const CalendarHome = (
  { fetchTasks, allTasks, createTask }
) => {
  const [state, setState] = useState({
    modalIsOpen: false,
    title: '',
    description: '',
    allDay: false,
    startDate: '',
    endDate: ''
  });
  const { modalIsOpen, title, description, allDay, startDate, endDate } = state;

  useEffect(() => {
    fetchTasks();
  }, []);

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
  }

  const handleAddTask = event => {
    event.preventDefault();
    createTask({ title, description, start_time: startDate, end_time: endDate, all_day: allDay });
    toggleModal();
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
        <button onClick={toggleModal}>close</button>
        <h1>Add a Task</h1>


        <form onSubmit={handleAddTask}>
          Title: <input required name="title" value={title} onChange={handleInputChange} /> <br />
            Description: <input required name="description" value={description} onChange={handleInputChange} /> <br />
            Start Date: <input min={moment().format('YYYY-MM-DDTHH:mm')} required type="datetime-local" name="startDate" value={startDate} onChange={handleInputChange} /> <br />
             End Date: <input min={moment(startDate).format('YYYY-MM-DDTHH:mm')} required type="datetime-local" name="endDate" value={endDate} onChange={handleInputChange} /> <br />
              All Day: <input type="checkbox" name="allDay" value={allDay} checked={allDay} onChange={handleInputChange} /> <br />
          <button>Create</button>
        </form>
      </Modal>

      <Calendar
        selectable
        localizer={localizer}
        events={allTasks}
        defaultView={Views.MONTH}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
        style={{ height: "100vh" }}
      />
    </>
  )
}

CalendarHome.propTypes = propTypes

const mapStateToProps = (state) => ({
  allTasks: state.tasks
});

export default connect(mapStateToProps, { fetchTasks, createTask })(CalendarHome)