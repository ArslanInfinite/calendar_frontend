import React, { useState, useEffect } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
// using this library for calendar, best one available
import moment from "moment";
// moment is needed for date and time manipulation for JS
import { connect } from 'react-redux';
import createSlot from 'react-tackle-box/Slot'
// dependency of react-b-c, needed to create slots 
import fetchTasks from '../redux/actions/fetchTasks';
import createTask from '../redux/actions/createTask';
import updateTask from '../redux/actions/updateTask';
import deleteTask from '../redux/actions/deleteTask';
import CreateTaskModal from './CreateTask';
import ViewTaskModal from './ViewTask';
import EditTaskModal from './EditTask';
// Modal is a popup feature in most calendars, seemed to be the best way for user interaction with these types of apps

import "react-big-calendar/lib/css/react-big-calendar.css";

const ExampleControlSlot = createSlot();
// same dependency for createSlot

const localizer = momentLocalizer(moment);
// requirement of react-big-cal ibrary to use this 

const CalendarHome = ( { fetchTasks, allTasks, createTask, updateTask, deleteTask } ) => {
  const [state, setState] = useState({
    showAddTaskModal: false,
    showViewTaskModal: false,
    showEditTaskModal: false,
    title: '',
    description: '',
    allDay: false,
    start: '',
    end: '',
    currentTask: null,
  });

  const { title, description, allDay, start, end, currentTask, showViewTaskModal } = state;
  // destructuring the object for easier access

  useEffect(() => {
    fetchTasks();
  }, []);
  // when component mounts we are fetching tasks from the backend

  const toggleAddModal = () => setState(prev => ({
    ...prev,
    showAddTaskModal: !prev.showAddTaskModal,
    title: '',
    description: '',
    start: '',
    end: '',
    allDay: false
  }));
  // toggle the state of the add modal 

  const toggleViewModal = () => setState(prev => ({
    ...prev,
    showViewTaskModal: !prev.showViewTaskModal,
  }));

  const toggleEditModal = (task = {}) => {
    setState(prev => ({
      ...prev,
      ...task,
      showEditTaskModal: !prev.showEditTaskModal,
      showViewTaskModal: false,
      start: moment(task.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(task.end).format('YYYY-MM-DDTHH:mm'),
    }))
  };

  const handleSelectSlot = ({ start, end }) => {
    setState(prev => ({
      ...prev,
      start: moment(start).format('YYYY-MM-DDTHH:mm'),
      end: moment(end).format('YYYY-MM-DDTHH:mm'),
      showAddTaskModal: true
    }));
  }

  const handleSelectEvent = currentTask => {
    setState(prev => ({
      ...prev,
      currentTask,
      showViewTaskModal: true
    }));
  }

  const handleAddTask = event => {
    event.preventDefault();
    createTask({ title, description, start, end, all_day: allDay });
    toggleAddModal();
  }

  const handleUpdateTask = (event) => {
    event.preventDefault();
    updateTask({ id: currentTask.id, title, description, start, end, all_day: allDay });
    toggleEditModal();
  }

  const handleDeleteTask = () => {
    deleteTask(currentTask.id);
    toggleViewModal();
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

      <CreateTaskModal state={state} handleAddTask={handleAddTask} toggleModal={toggleAddModal} handleInputChange={handleInputChange} />

      {showViewTaskModal && <ViewTaskModal toggleEditModal={toggleEditModal} showViewTaskModal={showViewTaskModal} task={currentTask} toggleModal={toggleViewModal} handleDeleteTask={handleDeleteTask} />}

      <EditTaskModal state={state} handleUpdateTask={handleUpdateTask} toggleModal={toggleEditModal} handleInputChange={handleInputChange} />

      <Calendar
        selectable
        localizer={localizer}
        events={allTasks}
        defaultView={Views.MONTH}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        style={{ height: "100vh" }}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  allTasks: state.tasks
});

export default connect(mapStateToProps, { fetchTasks, createTask, updateTask, deleteTask})(CalendarHome)