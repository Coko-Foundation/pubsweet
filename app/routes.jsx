import React from 'react'
import { Route } from 'react-router'

import App from './components/App'

// Admin
import About from './components/About'
import Dashboard from './components/Dashboard'
import Manage from './components/Manage'
import Create from './components/Create'

// Public
import Share from './components/Share'

export default (
  <Route component={App}>
    <Route path='/' component={Share}/>
    <Route path='/admin'>
      <Route path='manages' component={Manage} />
      <Route path='creates/:createId' component={Create} />
      <Route path='dashboard' component={Dashboard} />
      <Route path='about' component={About} />
    </Route>
  </Route>
)

