import React, { useState, useEffect } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
// using this library for calendar, best one available
import moment from "moment";
// moment is needed for date and time manipulation for JS
import { connect } from 'react-redux'; // Alongside Provider, passes store as props to entirety of application. 'react-redux' allows react and redux to communicate
import fetchTasks from '../redux/actions/fetchTasks';
import createTask from '../redux/actions/createTask';
import updateTask from '../redux/actions/updateTask';
import deleteTask from '../redux/actions/deleteTask';
import CreateTaskModal from './CreateTask';
import ViewTaskModal from './ViewTask';
import EditTaskModal from './EditTask';
// Modal is a popup feature in most calendars, seemed to be the best way for user interaction with these types of apps

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
// requirement of react-big-cal ibrary to use this 

const CalendarHome = ({ fetchTasks, allTasks, createTask, updateTask, deleteTask }) => {
  // state is the getter for accessing the state values in the component and setState is the function needed for updating the state values in the component. useState is the hook for initializing the state. 
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
  // destructuring the object for easier access, also makes for cleaner code 

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  // when component mounts we are fetching tasks from the backend
  // the empty array is a dependency, if it was [title], we would refetch the data everytime that title changes

  const toggleAddModal = () => setState({
    ...state,
    showAddTaskModal: !state.showAddTaskModal,
    title: '',
    description: '',
    start: '',
    end: '',
    allDay: false
  });
  // toggle the state of the add modal 

  const toggleViewModal = () => setState({
    ...state,
    showViewTaskModal: !state.showViewTaskModal //negatation state, opens and closes the modal
  });

  const toggleEditModal = (task = {}) => {
    // if task has a value, use that value, but if not, task is initialized to an empty object for spread operator purposes, you can't spread  a value that does not exist
    setState({
      ...state,
      title: '',
      description: '',
      allDay: false,      
      ...task,
      showEditTaskModal: !state.showEditTaskModal,
      showViewTaskModal: false,
      start: moment(task.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(task.end).format('YYYY-MM-DDTHH:mm'),
    })
  };

  const handleSelectSlot = ({ start, end }) => {
    setState({
      ...state,
      start: moment(start).format('YYYY-MM-DDTHH:mm'),
      end: moment(end).format('YYYY-MM-DDTHH:mm'),
      showAddTaskModal: true
    });
  }

  const handleSelectEvent = currentTask => {
    setState({
      ...state,
      currentTask,
      showViewTaskModal: true
    });
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
    const { name, value, type, checked } = event.target // destructuring the attributes located in CreateTask.js and EditTask.js
    const updates = {
      [name]: type === 'checkbox' ? checked : value
      // checking to see if the input is a type of text (title, desciption, start, end) or checkbox, and updates accordingly
    };
    console.log('name of field==>>', name, 'value==', value, 'checked==>>', checked, 'type==>>', type);
    console.log('updates==>>', updates);
    setState({ ...state, ...updates })
  }

  return (
    <>
      <CreateTaskModal
        state={state}
        handleAddTask={handleAddTask}
        toggleAddModal={toggleAddModal}
        handleInputChange={handleInputChange}
      />

      {showViewTaskModal && <ViewTaskModal // 1.only if showViewTaskModal is true, then we will show ViewTaskModal
        toggleEditModal={toggleEditModal}
        showViewTaskModal={showViewTaskModal}
        currentTask={currentTask} // 2. currentTask will not be null if showViewTaskModal is true
        toggleViewModal={toggleViewModal}
        handleDeleteTask={handleDeleteTask}
      />}

      <EditTaskModal
        state={state}
        handleUpdateTask={handleUpdateTask}
        toggleEditModal={toggleEditModal}
        handleInputChange={handleInputChange}
      />

      <Calendar
        selectable //allows us to click on a slot to create a NEW task
        localizer={localizer}
        events={allTasks}
        defaultView={Views.MONTH} // we use Views down here to set the default view as Month
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />

    </>
  )
}

const mapStateToProps = (state) => ({
  allTasks: state.task.data
});

export default connect(mapStateToProps, { fetchTasks, createTask, updateTask, deleteTask })(CalendarHome)