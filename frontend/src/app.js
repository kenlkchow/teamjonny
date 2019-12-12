import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './lib/privateRoutes'
import { ToastContainer, Flip } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.minimal.css'
import 'bulma'
import './style.scss'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Map from './components/Map'
import Circle from './components/Circle'
import NewLocation from './components/NewLocation'
import EditLocation from './components/EditLocation'
import RedirectHome from './components/RedirectHome'
import List from './components/List'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <ToastContainer 
      transition={Flip}
      autoClose={8000}
      toastClassName="toast"
      progressClassName="toast-progress"
    />
    <Switch>
      <Route exact path='/' component={Home} />
      <PrivateRoute exact path='/map' component={Map} />
      <PrivateRoute exact path='/circle' component={Circle} />
      <PrivateRoute exact path='/new' component={NewLocation} />
      <PrivateRoute exact path='/list' component={List} />
      <PrivateRoute exact path='/edit/:id' component={EditLocation} />
      <Route exact path='/mistakeswereMADE' component={RedirectHome} />
      <Redirect to="/map" />
    </Switch>
  </BrowserRouter>
)




ReactDOM.render(<App />, document.getElementById('root'))