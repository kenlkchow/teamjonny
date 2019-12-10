import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './lib/privateRoutes'

import './style.scss'
import 'bulma'

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
    <Switch>
      <Route exact path='/' component={Home} />
      <PrivateRoute exact path='/map' component={Map} />
      <PrivateRoute exact path='/circle' component={Circle} />
      <PrivateRoute exact path='/new' component={NewLocation} />
      <PrivateRoute exact path='/list' component={List} />
      <PrivateRoute exact path='/edit/:id' component={EditLocation} />
      <Route exact path='/redirect' component={RedirectHome} />
      <Redirect to="/map" />
    </Switch>
  </BrowserRouter>
)




ReactDOM.render(<App />, document.getElementById('root'))