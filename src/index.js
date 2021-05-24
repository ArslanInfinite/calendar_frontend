import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom' 
import calendarHome from './components/Home';
// BrowserRouter uses HTML5 API to keep track of UI with the URL. 
// Route tells React to renders certain components when certain routes/url are reached.
// Switch takes in all the children of Route, if it matches the route, it will stop searching for other routes
// Link helps us to not refresh the browser for every component rendered 



const AddTask = () => (
  <div>
    Add A New Task Here
  </div>
)

const EditTask = () => (
  <div>
    Edit A Task Here
  </div>
)

const PageNotFound = () => (
  <div>
     404! 
  </div>
)

const Header = () => (
  <header>
    <h1>Homepage</h1>
    <Link to='/'>Homepage</Link>
    <Link to='/add'>Add Task</Link>
    <Link to='/edit'>Edit Task</Link>
  </header>
)

  // create BrowserRouter instance, this is the parent for all the routes, knows the history for all the routes
  // div is needed for multiple children (routes) of BrowserRouter
  // route takes two attributes, the path and component. What component should render when what path is reached. 
const routes = (
  <BrowserRouter> 
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={calendarHome}/>
        <Route exact path='/add' component={AddTask}/>
        <Route exact path='/edit' component={EditTask} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('root')
); 