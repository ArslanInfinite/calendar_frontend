import {combineReducers} from 'redux';
import quranReducer from './quranReducer';
import taskReducer from './taskReducer';

export default combineReducers({
  task: taskReducer,
  quran: quranReducer
})