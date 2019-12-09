import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import 'bulma'
import './style.scss'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Map from './components/Map'
import Circle from './components/Circle'

const App = () => (
  <BrowserRouter>
  <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/map' component={Map} />
      <Route exact path='/circle' component={Circle} />
    </Switch>
  </BrowserRouter>
)


ReactDOM.render(<App />, document.getElementById('root'))