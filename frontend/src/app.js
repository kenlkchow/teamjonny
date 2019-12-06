import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'

import Home from './components/Home'
import Circle from './components/Circle'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/circle' component={Circle} />
    </Switch>
  </BrowserRouter>
)




ReactDOM.render(<App />, document.getElementById('root'))