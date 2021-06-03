import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CalendarHome from './components/CalendarHome';
import About from './components/About';
import Quran from './components/QuranFetch';
import Header from './components/Header'
import { store } from './redux/store/store';
import "./index.css";
// BrowserRouter uses HTML5 API to keep track of UI with the URL. 
// Route tells React to renders certain components when certain routes/url are reached.
// Switch takes in all the children of Route, if it matches the route, it will stop searching for other routes
// Link helps us to not refresh the browser for every component rendered 
Modal.setAppElement('#root');
// requirement for using React Modal 

// create BrowserRouter instance, this is the parent for all the routes, knows the history for all the routes
// div is needed for multiple children (routes) of BrowserRouter
// route takes two attributes, the path and component. What component should render when what path is reached. 
const routes = (
  <Provider store={store} >
    <BrowserRouter>
      <div>
        <Header />
          <Switch>
            <Route exact path='/' component={CalendarHome} />
            <Route exact path="/about" component={About} />
            <Route exact path="/quran" component={Quran} />
          </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(routes, document.getElementById('root')); 