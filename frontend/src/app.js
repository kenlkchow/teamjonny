import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'

import Home from './components/Home'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  </BrowserRouter>
)




ReactDOM.render(<App />, document.getElementById('root'))