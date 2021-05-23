import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route} from 'react-router-dom' //BrowserRouter uses HTML5 API to keep track of UI with the URL. Route tells React to renders certain components when certain routes/url are reached.

const calendarHome = () => (
  <div>
    Islamic Calendar Lite - Homepage
  </div>
)

  //create BrowserRouter instance, this is the parent for all the routes, knows the history for all the routes
  // div is needed for multiple children (routes) of BrowserRouter
  // route takes two attributes, the path and component. What component should render when what path is reached. 

const routes = (
  <BrowserRouter> 
    <div>
      <Route path='/' component={calendarHome}/>
    </div>
  </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('root')
); 