import React, { useState, useEffect } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
// import events from '../tasks';
import { connect } from 'react-redux';
import createSlot from 'react-tackle-box/Slot'
import fetchTasks from '../redux/actions/fetchTasks';
import createTask from '../redux/actions/createTask';
import updateTask from '../redux/actions/updateTask';
import CreateTaskModal from './CreateTask';
import ViewTaskModal from './ViewTask';
import EditTaskModal from './EditTask';

import "react-big-calendar/lib/css/react-big-calendar.css";

const ExampleControlSlot = createSlot();
const propTypes = {}

const localizer = momentLocalizer(moment);

const CalendarHome = (
  { fetchTasks, allTasks, createTask, updateTask }
) => {
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
    taskToEditId: null
  });
  const { title, description, allDay, start, end, currentTask, showViewTaskModal, taskToEditId } = state;

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleAddModal = () => setState(prev => ({
    ...prev,
    showAddTaskModal: !prev.showAddTaskModal,
    title: '',
    description: '',
    start: '',
    end: '',
    allDay: false
  }));

  const toggleViewModal = () => setState(prev => ({
    ...prev,
    showViewTaskModal: !prev.showViewTaskModal,
  }));

  const toggleEditModal = (task = {}) => {
    setState(prev => ({
      ...prev,
      ...task,
      taskToEditId: task.id,
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
    updateTask({ id: taskToEditId, title, description, start, end, all_day: allDay });
    toggleEditModal();
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

      {showViewTaskModal && <ViewTaskModal toggleEditModal={toggleEditModal} showViewTaskModal={showViewTaskModal} task={currentTask} toggleModal={toggleViewModal} />}

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
      //event => alert(event.title)
      />
    </>
  )
}

CalendarHome.propTypes = propTypes

const mapStateToProps = (state) => ({
  allTasks: state.tasks
});

export default connect(mapStateToProps, { fetchTasks, createTask, updateTask })(CalendarHome)